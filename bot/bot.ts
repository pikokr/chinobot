import Client from "./util/Client";
import {Command, CommandHandler, Inhibitor, InhibitorHandler, Listener, ListenerHandler} from "discord-akairo";
import config from '../config.json'
import {Message, MessageEmbed} from "discord.js";
import {connect} from "mongoose";
import Music from "./util/music";
import chokidar from 'chokidar'

import * as Sentry from '@sentry/node'
import path from "path";

const client = new Client()

chokidar.watch(path.join(__dirname, 'commands')).on('all', (e, path1, stats) => {
    if (e !== 'change') return
    console.log(`Command change detected: ${path1}`)
    Object.keys(require.cache).filter(r=>!r.includes('node_modules')).forEach(r=>delete require.cache[r])
    const name: Command = new (require(path1).default)()
    // @ts-ignore
    const cmd = (client.commandHandler.categories.map(r => r).reduce((acc, cur) => [...acc.map(r => r),...cur.map(r=>r)]) as Command[]).find(r=>{
        return r.id === name.id
    })
    cmd?.remove()
    client.commandHandler.register(name)
    console.log(`Reload command ${name.id}`)
})

chokidar.watch(path.join(__dirname, 'inhibitors')).on('all', (e, path1, stats) => {
    if (e !== 'change') return
    console.log(`Inhibitor change detected: ${path1}`)
    Object.keys(require.cache).filter(r=>!r.includes('node_modules')).forEach(r=>delete require.cache[r])
    const name: Inhibitor = new (require(path1).default)()
    // @ts-ignore
    const cmd = (client.inhibitorHandler.categories.map(r => r).reduce((acc, cur) => [...acc.map(r => r),...cur.map(r=>r)]) as Command[]).find(r=>{
        return r.id === name.id
    })
    cmd?.remove()
    client.inhibitorHandler.register(name)
    console.log(`Reload inhibitor ${name.id}`)
})

chokidar.watch(path.join(__dirname, 'listeners')).on('all', (e, path1, stats) => {
    if (e !== 'change') return
    console.log(`Listener change detected: ${path1}`)
    Object.keys(require.cache).filter(r=>!r.includes('node_modules')).forEach(r=>delete require.cache[r])
    const name: Listener = new (require(path1).default)()
    // @ts-ignore
    const cmd = (client.listenerHandler.categories.map(r => r).reduce((acc, cur) => [...acc.map(r => r),...cur.map(r=>r)]) as Command[]).find(r=>{
        return r.id === name.id
    })
    cmd?.remove()
    client.listenerHandler.register(name)
    console.log(`Reload inhibitor ${name.id}`)
})


Sentry.init({
    dsn: config.sentry.bot
})

client.once('ready', () => {
    Sentry.setTags({
        target: `Shard #${client.shard!.ids.reduce((acc,cur) => acc+cur)}`
    })
})

connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>client.login(config.token))

Message.prototype.embed = function () {
    const embed = new MessageEmbed()
    embed.setColor('BLUE')
    embed.setFooter(this.author.tag,this.author.avatarURL({dynamic:true})!)
    return embed
}

declare module 'discord.js' {
    interface Client {
        listenerHandler: ListenerHandler
        commandHandler: CommandHandler
        inhibitorHandler: InhibitorHandler
        music: Music
    }
    interface Message {
        embed() : MessageEmbed
    }
}
