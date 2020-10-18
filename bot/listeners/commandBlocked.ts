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
            case 'owner':
                return await msg.channel.send(msg.embed().setColor('RED').setDescription('이 명령어는 개발자 전용 명령어에요!'))
            case 'disabled':
                return await msg.channel.send(msg.embed().setColor('RED').setDescription('이 명령어는 이 서버에서 비활성화 되어있어요!'))
            default:
                return msg.channel.send(msg.embed().setTitle('명령어 실행 중지됨').setDescription('명령어 실행이 다음 사유로 차단되었습니다: ' + reason))
        }
    }
}