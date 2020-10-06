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
        await msg.channel.send(msg.embed().setTitle('명령어 실행 중지됨').setDescription('명령어 실행이 다음 사유로 차단되었습니다: ' + reason))
    }
}