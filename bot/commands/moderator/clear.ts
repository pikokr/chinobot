import {Argument, Command} from "discord-akairo";
import {Message, TextChannel} from "discord.js";

export default class Clear extends Command {
    constructor() {
        super('clear', {
            aliases: ['청소', 'clear'],
            category: 'moderator',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    type: Argument.range('integer', 1,100),
                    id: 'count',
                    prompt: false
                }
            ]
        });
    }
    async exec(msg: Message, {count}: {count: number}) {
        const messages = await (<TextChannel>msg.channel).bulkDelete(count+1)
        await msg.util?.send(`> :white_check_mark: 메시지 ${messages.size-1}개가 삭제되었어요!`)
    }
}