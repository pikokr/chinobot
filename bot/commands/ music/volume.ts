import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Volume extends Command {
    constructor() {
        super('volume', {
            aliases: ['볼륨'],
            description: '볼륨 조절하는 명령어',
            category: 'music',
            args: [
                {
                    id: 'volume',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async exec(msg: Message, {volume}: {volume: string}) {
        let player = this.client.music.players.get(msg.guild!.id)

        if (!player || !player.queue.current) return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 곡이 없어요!'))

        if (volume === '') return msg.util!.send(msg.embed().setTitle(`현재 볼륨은 ${player.volume}% 입니다!`).setFooter(''))

        if (isNaN(Number(volume)) || parseInt(volume) > 100 || parseInt(volume) < 1) return msg.util!.send(msg.embed().setTitle('볼륨은 1-100 사이에서 선택해주세요!').setFooter(''))

        if (!msg.member!.voice.channel) {
            return msg.util!.send(msg.embed().setTitle('음악을 재생중인 음성 채널에 들어가주세요!').setFooter(''))
        }

        player.setVolume(parseInt(volume))

        return msg.util!.send(msg.embed().setFooter('').setTitle(`볼륨을 ${player.volume}%로 설정했어요!`))
    }
}