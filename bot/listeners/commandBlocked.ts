import {Command, Listener} from "discord-akairo";
import {Message} from "discord.js";

export default class Ready extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    async exec(msg: Message, cmd: Command, reason: string) {
        switch (reason) {
            case 'disabled':
                return msg.channel.send(msg.embed().setColor('RED').setDescription('이 명령어는 이 서버에서 비활성화 되어있어요!'))
            default:
                return msg.react('🚫')
        }
    }
}