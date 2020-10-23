import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Ping extends Command {
    constructor() {
        super('ping', {
            aliases: ['핑'],
            description: '핑',
            category: 'general'
        });
    }
    async exec(msg: Message) {
        const m = await msg.util!.send(msg.embed().setTitle('핑 확인중').setDescription('잠시만 기다려주세요...'))
        const delay = Date.now() - m.createdTimestamp
        await msg.util!.send(msg.embed().setTitle('치노봇의 핑!').setDescription(`메시지 핑: ${delay}ms\n게이트웨이 핑: ${this.client.ws.ping}ms`))
    }
}