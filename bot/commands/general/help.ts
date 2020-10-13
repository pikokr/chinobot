import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['도움말', 'help'],
            description: '도움말입니다',
            category: 'general'
        });
    }
    async exec(msg: Message) {
        const embed = msg.embed()
        embed.setTitle(this.client.user?.username + ' 도움말')
        const categories = this.client.commandHandler.categories.array()
        categories.forEach(category => {
            embed.addField(category.id, category.array().map(r=>'`'+r.aliases[0]+'`').join(' '))
        })
        await msg.util?.send(embed)
    }
}