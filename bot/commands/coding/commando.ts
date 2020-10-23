import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch";

export default class Help extends Command {
    constructor() {
        super('search_commando', {
            aliases: ['commando'],
            description: 'discord.js-commando 검색하는 명령어',
            category: 'coding',
            args: [
                {
                    id: 'input',
                    match: 'rest',
                    default: '',
                }
            ]
        });
    }
    async exec(msg: Message, {input}: {input: string}) {
        if (!input) return msg.util!.send(msg.embed().setFooter('').setDescription('명령어 사용법: djs (검색어)'))
        const d = await (await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https://raw.githubusercontent.com/discordjs/discord.js-commando/docs/master.json&q=${encodeURIComponent(input)}`)).json()
        const embed = new MessageEmbed(d)
        await msg.util!.send(embed)
    }
}