import {Command} from "discord-akairo";
import {Message} from "discord.js";
import fetch from "node-fetch";
import {transform} from '@babel/core'

export default class Help extends Command {
    constructor() {
        super('babel', {
            aliases: ['바벨', 'babel'],
            description: '바벨 코드를 자바스크립트로 트랜스파일 하는 명령어',
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
        if (!input) return msg.util!.send(msg.embed().setFooter('').setDescription('명령어 사용법: 바벨 (코드(js 코드블럭 가능))'))
        const inp = input.replace(/^```js/, '').replace(/```$/, '')
        const embed = msg.embed()
        embed.setTitle('트랜스파일 진행중...')
        embed.addField('INPUT', `\`\`\`ts\n${inp.length > 1000 ? inp.slice(0,1000) + '...' : inp}\`\`\``)
        await msg.util!.send(embed)
        try {
            const res = transform(inp, {
                presets: ['@babel/preset-env']
            })!
            if (!res.code) {
                return msg.util!.send('트랜스파일을 시도했지만 결과가 없어요!')
            }
            const out = res.code
            if (out.length > 1000) {
                const data = await (await fetch('https://hastebin.com/documents', {
                    body: out,
                    method: 'POST'
                })).json()
                embed.addField('OUTPUT', `출력이 너무 길어서 hastebin으로 옮겼어요!\nhttps://hastebin.com/${data.key}`)
            } else {
                embed.addField('OUTPUT', '```js\n' + out + '```')
            }
            embed.setTitle('Babel')
            await msg.util!.send(embed)
        } catch (e) {
            await msg.util!.send(`트랜스파일 중 오류가 발생했어요!\n\`\`\`fix\n${e.message}\`\`\``)
        }
    }
}