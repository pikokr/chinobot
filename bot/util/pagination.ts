import _ from "lodash";
import {Message, MessageReaction} from "discord.js";
import {MessageEmbed} from "discord.js";

export default async (msg: Message, get:() => Promise<string[]>, size: number, em: MessageEmbed) => {
    const data = await get()
    if (!data.length) return false
    let embed = Object.assign(Object.create(Object.getPrototypeOf(em)), em)
    const pages = _.chunk(data, size)
    let current = 0
    const handle = async (reaction: MessageReaction) => {
        switch (reaction.emoji.name) {
            case '⬅️':
                if (pages[current-1]) {
                    current--
                    embed = Object.assign(Object.create(Object.getPrototypeOf(em)), em)
                    await m.edit(embed.setDescription(pages[current].join('\n')).setFooter(embed.footer.text + ` | 페이지 ${current+1}/${pages.length}`, embed.footer.iconURL))
                }
                break
            case '➡️':
                if (pages[current+1]) {
                    current++
                    embed = Object.assign(Object.create(Object.getPrototypeOf(em)), em)
                    await m.edit(embed.setDescription(pages[current].join('\n')).setFooter(embed.footer.text + ` | 페이지 ${current+1}/${pages.length}`, embed.footer.iconURL))
                }
                break
        }
    }
    const m = await msg.channel.send(embed.setDescription(pages[current].join('\n')).setFooter(embed.footer.text + ' | 페이지 1/' + pages.length, embed.footer.iconURL))
    if (pages.length === 1) return true
    const emojis = ['⬅️', '➡️']
    await Promise.all(emojis.map(r => m.react(r)))
    const collector = m.createReactionCollector((r,u) => emojis.includes(r.emoji.name) && u.id === msg.author.id, {
        time: 60000,
        dispose: true
    })

    collector.on('collect', handle)

    collector.on('remove', handle)

    collector.on('end', () => Promise.all(emojis.map(emoji => m.reactions.cache.find(r => r.emoji.name === emoji)?.remove())))
    return true
}
