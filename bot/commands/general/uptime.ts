import {Command} from "discord-akairo";
import {Message} from "discord.js";
import moment from 'moment'

export default class Uptime extends Command {
    constructor() {
        super('uptime', {
            aliases: ['업타임', 'uptime'],
            description: '업타임',
            category: 'general'
        });
    }
    async exec(msg: Message) {
        await msg.util!.send(msg.embed().setTitle('치노봇의 업타입!').setDescription([
            `클라이언트 업타임: ${moment.utc(moment.duration(this.client.uptime).asMilliseconds()).format('HH시간 mm분 ss초')}`,
            `프로세스 업타임: ${moment.utc(moment.duration(process.uptime() * 1000).asMilliseconds()).format('HH시간 mm분 ss초')}`,
            `서버 업타임: ${moment.utc(moment.duration(require('os').uptime() * 1000).asMilliseconds()).format('HH시간 mm분 ss초')}`
        ]))
    }
}