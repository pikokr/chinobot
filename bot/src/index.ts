import {ShardingManager} from "discord.js";
import * as path from "path";
import config from '../../config.json'
import sio from 'socket.io-client'

const manager = new ShardingManager(path.join(__dirname, 'bot.ts'), {
    execArgv: [
        '-r',
        'ts-node/register',
    ],
    shardArgs: ['--color'],
    token: config.token
})

manager.on('shardCreate', shard => console.log(`Shard #${shard.id} created`))

manager.spawn().then(() => {
    const io = sio(`${config.web.addr}/bot`, {
        query: {
            auth: config.web.socket.namespaces.bot.secret
        }
    })
    io.on('shards', (data: any) => {
        io.emit(data.event, manager.shards.map(v => ({id:v.id,ready:v.ready})))
    })
    io.on('connect', () => console.log('Connected to backend socket'))
})
