import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
    constructor() {
        super('play', {
            aliases: ['재생'],
            description: '음악 재생하는 명령어',
            category: 'info'
        });
    }
    async exec(msg: Message) {
        if (!msg.member!.voice.channel) {
            return msg.util!.send(msg.embed().setTitle('음성 채널에 들어가주세요!').setFooter(''))
        }
        let player = this.client.music.getPlayer(msg.guild!.id)

        if (player) {
            if (msg.member!.voice.channelID !== player.voiceConnection.voiceChannelID) {
                return msg.util!.reply(msg.embed().setFooter('').setTitle('음악을 재생중인 채널에 들어가주세요!'))
            }
        }

        const node = this.client.music.getNode()

        const tracks = await node

        if (!player) {
            player = await node.joinVoiceChannel({
                guildID: msg.guild!.id,
                deaf: true,
                voiceChannelID: msg.member!.voice.channelID!
            })
        }
        player.on('error', async err => {
            await msg.channel.send(msg.embed().setTitle('곡 재생중 오류가 발생했습니다.').setDescription('```js\n' + err.message + '```').setFooter(''))
        })
        const events: any[] = ['end', 'closed', 'nodeDisconnect']
        for (const event of events) player.on(event, player.disconnect);
    }
}