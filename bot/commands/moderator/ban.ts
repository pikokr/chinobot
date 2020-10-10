import {Command} from "discord-akairo";
import {GuildMember, Message} from "discord.js";

export default class Clear extends Command {
    constructor() {
        super('차단', {
            aliases: ['차단', 'ban', '밴'],
            category: 'moderator',
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    type: 'member',
                    id: 'member',
                    prompt: {
                        start: '멤버를 입력하세요'
                    }
                },
                {
                    type: 'string',
                    id: 'reason',
                    prompt: true,
                    default: '사유 없음',
                    match: 'rest'
                }
            ]
        });
    }
    async exec(msg: Message, {member, reason}: {member: GuildMember, reason: string}) {
        if (member.hasPermission(['ADMINISTRATOR'])) return msg.util?.reply('관리자는 차단할수 없어요!')
        await member.ban({
            reason: reason
        })
        await msg.util?.send(msg.embed().setTitle('차단').setDescription(`멤버 ${member.user.tag}님을 차단했습니다.`))
    }
}