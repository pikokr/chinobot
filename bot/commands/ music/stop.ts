import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
    constructor() {
        super('stop', {
            aliases: ['정지'],
            description: '음악 정지하는 명령어',
            category: 'info'
        });
    }

    async exec(msg: Message) {
        let player = this.client.music.players.get(msg.guild!.id)

        if (!player) return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 곡이 없어요!'))

        if (!msg.member!.voice.channel) {
            return msg.util!.send(msg.embed().setTitle('음악을 재생중인 음성 채널에 들어가주세요!').setFooter(''))
        }

        if (msg.member!.voice.channelID !== player.voiceChannel) {
            return msg.util!.send(msg.embed().setFooter('').setTitle('음악을 재생중인 채널에 들어가주세요!'))
        }

        if (!msg.member!.hasPermission('ADMINISTRATOR')) {
            const ls = Array.from(player.queue)
            if (player.queue.current) {
                ls.push(player.queue.current)
            }
            if (ls.filter(v=>v.author === msg.author.id).length !== ls.length) {
                return msg.util!.send(msg.embed().setFooter('').setTitle('재생을 정지하려면 남은 곡이 모두 자신이 신청한 곡이거나 관리자 권한이 있어야해요!'))
            }
        }
        player.destroy()
        return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 음악을 정지하고 대기열을 초기화했어요!'))
    }
}