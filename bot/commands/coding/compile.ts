import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {Aliases, postEval} from "../../util/Myriad";
import fetch from 'node-fetch'

export default class Help extends Command {
    constructor() {
        super('compile', {
            aliases: ['컴파일', 'compile'],
            description: '컴파일 하는 명령어',
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

    parseMessage(content: string) {
        const regex = /^\s*(`{1,3})(.+?)[ \n]([^]+)\1\s*$/;
        const match = content.match(regex);
        if (!match) {
            return null;
        }

        const language = Aliases.get(match[2].toLowerCase());
        if (!language) {
            return null;
        }

        const code = match[3].trim();
        return { language, code };
    }

    async exec(msg: Message, {input}: {input: string}) {
        if (!input) return msg.util!.send(msg.embed().setFooter('').setDescription('명령어 사용법: 컴파일 (코드블럭)'))
        const parse = this.parseMessage(input);
        if (!parse) {
            return msg.util!.send(msg.embed().setFooter('').setDescription(`치노봇이 컴파일할 수 없는 언어이거나 코드블럭이 아니에요!`))
        }
        const embed = msg.embed()
        embed.setTitle('컴파일 진행중....')

        const lang = parse.language

        const code = parse.code

        embed.addField('INPUT', `\`\`\`${lang}\n${code.length > 1000 ? code.slice(0,1000) + '...' : code}\`\`\``)

        await msg.util!.send(embed)

        const [ok, response] = await postEval(lang, code)

        if (ok) {
            embed.setColor('GREEN')
        } else {
            embed.setColor('RED')
        }

        let out = '```\n' + response + '```'

        if (out.length > 1000) {
            const key = (await (await fetch('https://hastebin.com/documents', {method: 'POST', body: response})).json()).key
            out = `내용이 너무 길어서 HasteBin 으로 옮겼어요!\nhttps://hastebin.com/${key}`
        }
        embed.setTitle(`컴파일 - \`${lang}\``)
        embed.addField('OUTPUT', out)
        await msg.util!.send(embed)
    }
}
