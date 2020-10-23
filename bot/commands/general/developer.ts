import {Command} from "discord-akairo";
import {Message} from "discord.js";
import config from '../../../config.json'

export default class Developer extends Command {
    constructor() {
        super('developer', {
            aliases: ['개발자'],
            description: '개발자 목록',
            category: 'general'
        });
    }
    async exec(msg: Message) {
        const arr = Array.from(new Set((await this.client.shard!.broadcastEval(`this.users.cache.filter(r=>${JSON.stringify(config.owner)}.includes(r.id)).map(r=>r.tag)`)).filter(r=>r).reduce((acc,cur)=>[...acc,...cur])))
        await msg.channel.send(msg.embed().setTitle('개발자 목록').setDescription(arr.join(', ')))
    }
}