import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Eval extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'cmd'],
            ownerOnly: true,
            args: [
                {
                    id: 'script',
                    match: 'rest',
                    prompt: false
                },
            ],
            category: 'dev'
        });
    }
    async exec(msg: Message, {script}: {script: string}) {
        const input = script.replace(/^```(js)?/,'').replace(/```$/,'')
        const embed = msg.embed()
        embed.setTitle('Evaluating....')
        embed.addField('INPUT', '```js\n' + (input.length > 1000 ? input.slice(0,1000) + '...' : input) + '```')
        await msg.util?.send(embed)
        const prev = Date.now()
        embed.addField('OUTPUT', '```js\n' + (await new Promise(resolve => resolve(eval(input))).then(res=> {
            embed.setColor('GREEN')

            let r

            if (typeof res === 'string') r = res
            else r = require('util').inspect(res)

            return r.length > 1000 ? r.slice(0,1000) + '...' : r
        }).catch(e => {
            embed.setColor('RED')
            const r = e.message
            return r.length > 1000 ? r.slice(0,1000) + '...' : r
        }).then(r=>(r.length > 1000 ? r.slice(0,1000) + '...' : r))) + '```')
        embed.setTitle('EVAL')
        embed.setFooter(msg.author.tag + ` | 실행 시간: ${Date.now() - prev}ms`, msg.author.avatarURL({dynamic: true})!)
        await msg.util?.send(embed)
    }
}