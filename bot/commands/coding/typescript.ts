import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {transpile} from "typescript";
import fetch from "node-fetch";

export default class Help extends Command {
    constructor() {
        super('trans_typescript', {
            aliases: ['타입스크립트', 'ts', 'typescript'],
            description: '타입스크립트를 자바스크립트로 트랜스파일 하는 명령어',
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
        if (!input) return msg.util!.send(msg.embed().setFooter('').setDescription('명령어 사용법: 타입스크립트 (코드(ts 코드블럭 가능))'))
        const inp = input.replace(/^```ts/, '').replace(/```$/, '')
        const embed = msg.embed()
        embed.setTitle('트랜스파일 진행중...')
        embed.addField('INPUT', `\`\`\`ts\n${inp.length > 1000 ? inp.slice(0,1000) + '...' : inp}\`\`\``)
        await msg.util!.send(embed)
        try {
            const out = transpile(inp)
            if (out.length > 1000) {
                const data = await (await fetch('https://hastebin.com/documents', {
                    body: out,
                    method: 'POST'
                })).json()
                embed.addField('OUTPUT', `출력이 너무 길어서 hastebin으로 옮겼어요!\nhttps://hastebin.com/${data.key}`)
            } else {
                embed.addField('OUTPUT', '```js\n' + out + '```')
            }
            embed.setTitle('Typescript')
            await msg.util!.send(embed)
        } catch (e) {
            await msg.util!.send(`트랜스파일 중 오류가 발생했어요!\n\`\`\`fix\n${e.message}\`\`\``)
        }
    }
}