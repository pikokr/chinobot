import {Command} from "discord-akairo";
import {GuildMember, Message} from "discord.js";

export default class Clear extends Command {
    constructor() {
        super('추방', {
            aliases: ['추방', 'kick', '킥'],
            category: 'moderator',
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
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
                    prompt: {
                        start: '사유를 입력하세요'
                    },
                    default: '사유 없음',
                    match: 'rest'
                }
            ]
        });
    }
    async exec(msg: Message, {member, reason}: {member: GuildMember, reason: string}) {
        if (member.hasPermission(['ADMINISTRATOR'])) return msg.util?.reply('관리자는 추방할수 없어요!')
        await member.kick(reason)
        await msg.util?.send(msg.embed().setTitle('추방').setDescription(`멤버 ${member.user.tag}님을 추방했습니다.\n사유: ${reason}`))
    }
}