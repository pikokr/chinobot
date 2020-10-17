import {Command} from "discord-akairo";
import {GuildMember, Message} from "discord.js";
import Warn from '../../../models/Warn'
import pagination from "../../util/pagination";
import config from '../../../config.json'

export default class Clear extends Command {
    constructor() {
        super('warn_list', {
            aliases: ['경고보기'],
            category: 'moderator',
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    type: 'member',
                    id: 'member',
                    default: null
                }
            ]
        });
    }
    async exec(msg: Message, {member}: {member:GuildMember|null}) {
        if (!member) {
            const warns = (await Warn.find({guild: msg.guild!.id}))
            const members = Array.from(new Set(warns.map(r=>r.member)))
            // @ts-ignore
            if (!await pagination(msg, async () => members.map(m=>`<@${m}>\n${warns.filter(r=>r.member === m).map(r=>`${r.reason}`)}${
                msg.member!.hasPermission('ADMINISTRATOR') ? `\n[관리하기](${config.web.frontend}/servers/${msg.guild!.id}/warns)` : ''
            }`), 1, msg.embed().setTitle('경고 목록 - 전체'))) {
                await msg.util!.send('경고가 없어요!')
            }
        }
    }
}