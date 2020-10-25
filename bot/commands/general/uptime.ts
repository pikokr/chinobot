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
        function f(duration: any) {
            return `${duration._data.days}일 ${duration._data.hours}시간 ${duration._data.minutes}분 ${duration._data.seconds}초`
        }
        await msg.util!.send(msg.embed().setTitle('치노봇의 업타입!').setDescription([
            `클라이언트 업타임: ${f(moment.duration(this.client.uptime))}`,
            `프로세스 업타임: ${f(moment.duration(process.uptime() * 1000))}`,
            `서버 업타임: ${f(moment.duration(require('os').uptime() * 1000))}`
        ]))
    }
}
