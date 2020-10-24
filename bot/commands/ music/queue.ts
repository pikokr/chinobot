import {Command} from "discord-akairo";
import {Message, User} from "discord.js";
import {formatTime} from "../../util/time";
import createBar from "../../util/progress";
import pagination from "../../util/pagination";

export default class Queue extends Command {
    constructor() {
        super('queue', {
            aliases: ['큐', 'queue'],
            description: '재생목록 확인하는 명령어',
            category: 'music'
        });
    }

    async exec(msg: Message) {
        let player = this.client.music.players.get(msg.guild!.id)

        if (!player || !(player.queue.length + (player.queue.current ? 1 : 0))) return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 곡이 없어요!'))

        // TODO

        const q = [player.queue.current!, ...player.queue]

        if (!await pagination(msg, async () => q.map((r,i) => `${i+1} - [${r.title}](${r.uri}) - ${(r.requester as any).tag}`), 10, msg.embed().setTitle(`${msg.guild!.name}의 대기열!`)))
            return msg.util!.send('대기열에 곡이 없어요!')
    }
}