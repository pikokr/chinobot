import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
    constructor() {
        super('play', {
            aliases: ['재생'],
            description: '음악 재생하는 명령어',
            category: 'info',
            args: [
                {
                    match: 'rest',
                    id: 'query',
                    type: 'string',
                    default: null
                }
            ]
        });
    }
    async exec(msg: Message, {query}: {query:string}) {
        if (!msg.member!.voice.channel) {
            return msg.util!.send(msg.embed().setTitle('음성 채널에 들어가주세요!').setFooter(''))
        }
        let player = this.client.music.players.get(msg.guild!.id)

        if (player) {
            if (msg.member!.voice.channelID !== player.voiceChannel) {
                return msg.util!.reply(msg.embed().setFooter('').setTitle('음악을 재생중인 채널에 들어가주세요!'))
            }
        }

        const res = await this.client.music.search(query)

        console.log(`[MUSIC:SEARCH] User: ${msg.author.id} Guild: ${msg.guild!.id} Load Type: ${res.loadType} Query: ${query}`)

        console.log(res.loadType)
    }
}