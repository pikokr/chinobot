import {Command} from "discord-akairo";
import {Message} from "discord.js";
import fetch from "node-fetch";
import config from '../../../config.json'

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
        const now = Date.now()
        await fetch(config.web.addr)
        await msg.util!.send(msg.embed().setTitle('치노봇의 핑!').setDescription(`메시지 핑: ${delay}ms\n게이트웨이 핑: ${this.client.ws.ping}ms\n웹사이트 핑\n치노봇 API 핑: ${Date.now() - now}ms`))
    }
}