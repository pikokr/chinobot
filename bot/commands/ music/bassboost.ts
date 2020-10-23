import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
    constructor() {
        super('bass_boost', {
            aliases: ['베이스부스트'],
            description: '베이스부스트 설정하는 명령어',
            category: 'music',
            args: [
                {
                    id: 'value',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async exec(msg: Message, {value}: {value: string}) {
        let player = this.client.music.players.get(msg.guild!.id)

        if (!player || !player.queue.current) return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 곡이 없어요!'))

        if (value === '') return msg.util!.send(msg.embed().setTitle(`현재 볼륨은 ${player.volume}% 입니다!`).setFooter(''))

        if (isNaN(Number(value)) || parseInt(value) < 0) return msg.util!.send(msg.embed().setTitle('베이스 부스트는 0 이상이어야 해요!').setFooter(''))

        if (!msg.member!.voice.channel) {
            return msg.util!.send(msg.embed().setTitle('음악을 재생중인 음성 채널에 들어가주세요!').setFooter(''))
        }

        // TODO

        return msg.util!.send(msg.embed().setFooter('').setTitle(`베이스 부스트를 설정했어요. 다음 곡부터 적용됩니다!`))
    }
}