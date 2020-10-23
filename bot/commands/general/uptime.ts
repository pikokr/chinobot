import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Uptime extends Command {
    constructor() {
        super('uptime', {
            aliases: ['업타임', 'uptime'],
            description: '업타임',
            category: 'general'
        });
    }
    async exec(msg: Message) {
    }
}