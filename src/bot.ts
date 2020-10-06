import Client from "./util/Client";
import {CommandHandler, ListenerHandler} from "discord-akairo";
import config from '../config.json'
import {Message, MessageEmbed} from "discord.js";

const client = new Client()

client.login(config.token)

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
    }
    interface Message {
        embed() : MessageEmbed
    }
}
