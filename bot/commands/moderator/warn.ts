import {Command} from "discord-akairo";
import {GuildMember, Message} from "discord.js";
import Warn from '../../../models/Warn'
import Guild from '../../../models/Guild'

export default class Clear extends Command {
    constructor() {
        super('warn', {
            aliases: ['경고'],
            category: 'moderator',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    type: 'member',
                    id: 'member',
                    prompt: {
                        start: '사유를 입력하세요'
                    },
                },
                {
                    type: 'string',
                    id: 'reason',
                    prompt: {
                        start: '사유를 입력하세요'
                    },
                }
            ]
        });
    }
    async exec(msg: Message, {member, reason}: {member:GuildMember,reason:string}) {
        if (member.hasPermission('ADMINISTRATOR')) return msg.util!.send('관리자에게 경고를 지급할 수 없어요!')
        const warn = new Warn()
        warn.guild = msg.guild!.id
        warn.member = member.id
        warn.id = Date.now().toString(16)
        warn.reason = reason
        await warn.save()
        await msg.util!.send(msg.embed().setTitle('경고 지급됨').setDescription(`ID: ${warn.id}\n멤버: ${member}\n사유: ${reason}`))
        const guild = (await Guild.findOne({id:msg.guild!.id}))!
        if (guild.warnStack === 0) {
            return
        } else {
            if (guild.warnStack <= (await Warn.find({id:member.id})).length) {
                await member.ban()
                await Warn.deleteMany({id:member.id})
                await msg.channel.send(`멤버 차단됨\n멤버 ${member.user.tag}님이 경고를 ${guild.warnStack}번 이상 받아 서버에서 차단되었어요!`)
            }
        }
    }
}