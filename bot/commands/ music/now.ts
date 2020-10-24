import {Command} from "discord-akairo";
import {Message, User} from "discord.js";
import {formatTime} from "../../util/time";
import createBar from "../../util/progress";

export default class Now extends Command {
    constructor() {
        super('now_playing', {
            aliases: ['현재곡', 'np'],
            description: '곡 스킵하는 명령어',
            category: 'music'
        });
    }

    async exec(msg: Message) {
        let player = this.client.music.players.get(msg.guild!.id)

        if (!player || !player.queue.current) return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 곡이 없어요!'))

        const t = player.queue.current

        const embed = msg.embed()
        embed.setTitle(t.title)
        embed.setURL(t.uri)
        embed.addField('길이', t.isStream ? '실시간' : formatTime(t.duration), true)
        embed.addField('저자', t.author, true)
        embed.addField('신청자', (t.requester as User).tag, true)
        if (!t.isStream) {
            embed.setDescription('```\n' + `${formatTime(player.position)}/${formatTime(t.duration)}\n` + createBar(t.duration, player.position)[0] + '```')
        }
        embed.setImage(t.displayThumbnail('maxresdefault'))

        return msg.util!.send(embed)
    }
}