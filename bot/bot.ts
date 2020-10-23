import Client from "./util/Client";
import {CommandHandler, InhibitorHandler, ListenerHandler} from "discord-akairo";
import config from '../config.json'
import {Message, MessageEmbed} from "discord.js";
import {connect} from "mongoose";
import Music from "./util/music";

import * as Sentry from '@sentry/node'

const client = new Client()

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
