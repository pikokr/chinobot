import {Command} from "discord-akairo";
import {Message} from "discord.js";
import childProcess, {ExecException} from 'child_process'

const exec = (cmd: string) => {
    return new Promise<{stdout:string,stderr:string,error:ExecException|null}>(resolve => {
        childProcess.exec(cmd, (error, stdout, stderr) => resolve({stdout,stderr,error}))
    })
}

export default class Shell extends Command {
    constructor() {
        super('shell', {
            aliases: ['shell', 'sh'],
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
        await msg.util!.send('실행중..')
        const out = await exec(script)
        if (out.stdout) {
            const d = out.stdout
            await msg.channel.send('STDOUT\n```sh\n' + (d.length > 1900 ? d.slice(0,1900) + '...' : d) + '```')
        }
        if (out.stderr) {
            const d = out.stderr
            await msg.channel.send('STDERR\n```sh\n' + (d.length > 1900 ? d.slice(0,1900) + '...' : d) + '```')
        }
    }
}