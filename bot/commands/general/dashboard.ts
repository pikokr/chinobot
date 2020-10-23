import {Command} from "discord-akairo";
import {Message} from "discord.js";
import config from '../../../config.json'

export default class Dashboard extends Command {
    constructor() {
        super('dashboard', {
            aliases: ['대시보드', 'dashboard', 'dash'],
            description: '대시보드 링크',
            category: 'general'
        });
    }
    async exec(msg: Message) {
        await msg.channel.send(msg.embed().setTitle(`서버 \`${msg.guild!.name}\`의 대시보드!`).setDescription(`${config.web.frontend}/servers/${msg.guild!.id}${
            msg.member!.hasPermission('ADMINISTRATOR') ? '' : '\n관리자 권한이 없네요! 관리자 권한이 없으면 대시보드에 접속하실 수 없어요!'
        }`))
    }
}