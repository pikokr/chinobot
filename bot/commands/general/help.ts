import {Command} from "discord-akairo";
import {Message} from "discord.js";
import Guild from '../../../models/Guild'

export default class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['도움말', 'help', '도움'],
            description: '도움말입니다',
            category: 'general'
        });
    }
    async exec(msg: Message) {
        const disables = (await Guild.findOne({id: msg.guild!.id}))!
        const embed = msg.embed()
        embed.setTitle(this.client.user?.username + ' 도움말')
        const categories = this.client.commandHandler.categories.array()
        categories.forEach(category => {
            if (category.id === 'dev') {
                if (!this.client.isOwner(msg.author)) return
            }
            const items = category.array().filter(r=>!disables.disabledCommands.includes(r.id))
            if (!items.length) return
            embed.addField(category.id, items.map(r=>'`'+r.aliases[0]+'`').join(' '))
        })
        await msg.util?.send(embed)
    }
}