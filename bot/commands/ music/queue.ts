import {Command} from "discord-akairo";
import {Message, User} from "discord.js";
import {formatTime} from "../../util/time";
import createBar from "../../util/progress";

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

        if (!player || !player.queue.length || !player.queue.current) return msg.util!.send(msg.embed().setFooter('').setTitle('재생중인 곡이 없어요!'))

        const embed = msg.embed()

        // TODO

        return msg.util!.send(embed)
    }
}