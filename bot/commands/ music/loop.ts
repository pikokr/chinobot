import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Loop extends Command {
    constructor() {
        super('loop', {
            aliases: ['반복'],
            description: '반복 설정하는 명령어',
            category: 'music',
            args: [
                {
                    id: 'type',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async exec(msg: Message, {type}: { type: string }) {
        let player = this.client.music.players.get(msg.guild!.id)

        if (!player || !player.queue.current) return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 곡이 없어요!'))

        switch (type) {
            case '해제':
                player.setQueueRepeat(false)
                player.setTrackRepeat(false)
                return msg.util!.send(msg.embed().setTitle('반복').setDescription('반복이 비활성화 되었어요!'))
            case '대기열':
                player.setQueueRepeat(true)
                return msg.util!.send(msg.embed().setTitle('반복').setDescription('전체 대기열을 반복할게요!'))
            case '곡':
                player.setTrackRepeat(true)
                return msg.util!.send(msg.embed().setTitle('반복').setDescription('현재 곡을 반복할게요!'))
            default:
                return msg.util!.send(msg.embed().setTitle('반복').setDescription(`명령어 사용법: 반복 [해제/대기열/곡], 현재: ${player.trackRepeat ? '곡 반복' : player.queueRepeat ? '대기열 반복' : '반복 안함'}`))
       }
    }
}