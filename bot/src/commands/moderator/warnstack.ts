import {Command} from "discord-akairo";
import {Message} from "discord.js";
import Guild from '../../models/Guild'

export default class Clear extends Command {
    constructor() {
        super('경고스택설정', {
            aliases: ['경고스택설정'],
            category: 'moderator',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    type: 'integer',
                    id: 'count',
                    prompt: {
                        start: '경고 개수를 입력하세요'
                    },
                }
            ]
        });
    }
    async exec(msg: Message, {count}: {count:number}) {
        await Guild.update({id: msg.guild!.id}, {$set: {
            warnStack: count
        }})
        if (count > 0) {
            await msg.util?.send(`경고 자동 차단 스택이 ${count}번으로 설정되었어요! 경고를 ${count}번 받으면 자동으로 서버에서 차단당해요!`)
        } else {
            await msg.util?.send('경고 자동 차단 스택이 비활성화 되었어요!')
        }
    }
}