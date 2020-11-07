import { ShardingManager } from "discord.js"
import * as path from "path"
import config from '../config.json'
import sio from 'socket.io-client'
import * as Sentry from '@sentry/node'

Sentry.init({
    dsn: config.sentry.bot,
})

Sentry.setTags({
    target: 'ShardManager'
})

const manager = new ShardingManager(path.join(__dirname, process.env.NODE_ENV === 'production' ? 'bot.js' : 'bot.ts'), {
    execArgv: process.env.NODE_ENV === 'production' ? [] : [
        '-r',
        'ts-node/register',
    ],
    token: config.token
})

manager.on('shardCreate', (shard) => console.log(`Shard #${shard.id} created`))

const io = sio(`${config.web.addr}/bot`, {
    query: {
        auth: config.web.socket.namespaces.bot.secret
    }
})

io.on('shards', async (data: any) => {
    const shards: any[] = []
    for (let shard of manager.shards.values()) {
        if (shard.ready) {
            const data = await shard.eval(`
            ({
                guilds: this.guilds.cache.size,
                users: this.guilds.cache.map(r=>r.memberCount).reduce((acc,cur) => acc+cur)
            })
            `)
            shards.push({id: shard.id, online: shard.ready, ...data})
        } else { shards.push({id: shard.id, online: shard.ready}) }
    }
    io.emit('response', {data: shards, evt: data.event})
})

io.on('eval', async (data: any) => {
    const res = (await Promise.all(manager.shards.filter(r=>r.ready).map(shard => shard.eval(data.payload.script))))
    io.emit('response', {evt: data.event, data: res || null})
})

io.on('guild', async (data: any) => {
    const res = (await Promise.all(manager.shards.filter(r=>r.ready).map(shard => shard.eval(`
    this.guilds.cache.get('${data.payload.id}')?.toJSON()
    `)))).find(r=>r)
    io.emit('response', {evt: data.event, data: res || null})
})

io.on('guilds', async (data: any) => {
    const result: Array<any> = []
    for (let i of data.payload.guilds) {
        const res = (await Promise.all(
            manager.shards.filter(r=> r.ready).map(shard => 
               shard.eval(`this.guilds.cache.get('${i}')?.toJSON()`)
            )
        )).find(r=>r)
        result.push(res)
    }
    io.emit('response', { evt: data.event, data: result || null })
})

io.on('connect', () => console.log('Connected to backend socket'))

manager.spawn()
