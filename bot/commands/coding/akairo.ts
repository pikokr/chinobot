import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch";

export default class Help extends Command {
    constructor() {
        super('search_akairo', {
            aliases: ['akairo'],
            description: 'discord.js-akairo 검색하는 명령어',
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
        const d = await (await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https://raw.githubusercontent.com/discord-akairo/discord-akairo/docs/master.json&q=${encodeURIComponent(input)}`)).json()
        const embed = new MessageEmbed(d)
        embed.setAuthor(embed.author?.name, 'https://avatars3.githubusercontent.com/u/48862924?s=88&v=4', embed.author?.url)
        await msg.util!.send(embed)
    }
}