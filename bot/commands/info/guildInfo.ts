import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
    constructor() {
        super('guild_info', {
            aliases: ['서버정보'],
            description: '서버 정보 표시하는 명령어',
            category: 'info'
        });
    }
    async exec(msg: Message) {
    }
}