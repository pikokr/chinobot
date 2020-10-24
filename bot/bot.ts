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
    Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
    if (e !== 'change') return
    console.log(`Listener change detected: ${path1}`)
    Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
    client.listenerHandler.reloadAll()
    let command
    try {
        command = client.listenerHandler.load(path1)
    } catch (e) {
        return
    }
    console.log(`Reload command ${command.id}`)
})

chokidar.watch(path.join(__dirname, 'inhibitors')).on('all', (e, path1, stats) => {
    if (e !== 'change') return
    console.log(`Inhibitor change detected: ${path1}`)
    Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
    client.listenerHandler.reloadAll()
    let inhibitor
    try {
        inhibitor = client.listenerHandler.load(path1)
    } catch (e) {
        return
    }
    console.log(`Reload inhibitor ${inhibitor.id}`)
})

chokidar.watch(path.join(__dirname, 'listeners')).on('all', (e, path1, stats) => {
    if (e !== 'change') return
    console.log(`Listener change detected: ${path1}`)
    Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
    client.listenerHandler.reloadAll()
    let listener
    try {
        listener = client.listenerHandler.load(path1)
    } catch (e) {
        return
    }
    console.log(`Reload listener ${listener.id}`)
})


Sentry.init({
    dsn: config.sentry.bot
})

client.once('ready', () => {
    Sentry.setTags({
        target: `Shard #${client.shard!.ids.reduce((acc, cur) => acc + cur)}`
    })
})

connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => client.login(config.token))

Message.prototype.embed = function () {
    const embed = new MessageEmbed()
    embed.setColor('BLUE')
    embed.setFooter(this.author.tag, this.author.avatarURL({dynamic: true})!)
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
        embed(): MessageEmbed
    }
}
