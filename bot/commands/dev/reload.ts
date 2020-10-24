import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Reload extends Command {
    constructor() {
        super('리로드', {
            aliases: ['reload', 'rl', '리로드'],
            ownerOnly: true,
            category: 'dev'
        });
    }
    async exec(msg: Message) {
        await msg.client.shard!.broadcastEval(client => {
            Object.keys(require.cache).filter(r=>!r.includes('node_modules')).forEach(r=>delete require.cache[r])
        })
        await msg.react('✅')
    }
}