import {Listener} from "discord-akairo";
import {Message} from "discord.js";
import * as Sentry from '@sentry/node'

export default class Ready extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    async exec(err: Error, msg: Message) {
        const embed = msg.embed()
        embed.setTitle('명령어 오류 발생')
        embed.setDescription(`이 코드를 개발자에게 전달해주세요\n\`${Sentry.captureException(err)}\``)
        await msg.util!.send(embed)
    }
}