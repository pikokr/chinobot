import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
    constructor() {
        super('skip', {
            aliases: ['스킵'],
            description: '곡 스킵하는 명령어',
            category: 'info'
        });
    }

    async exec(msg: Message) {
        let player = this.client.music.players.get(msg.guild!.id)

        if (!player || !player.queue.current) return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 곡이 없어요!'))

        if (!msg.member!.voice.channel) {
            return msg.util!.send(msg.embed().setTitle('음악을 재생중인 음성 채널에 들어가주세요!').setFooter(''))
        }

        if (!msg.member!.hasPermission('ADMINISTRATOR')) {
            if (player.queue.current.author !== msg.author.id) {
                return msg.util!.send(msg.embed().setTitle('곡은 신청한 사람이나 관리자만 스킵할 수 있어요!').setFooter(''))
            }
        }
        player.stop()
        return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 음악을 정지하고 대기열을 초기화했어요!'))
    }
}