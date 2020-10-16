import {Command} from "discord-akairo";
import {Message} from "discord.js";
import {formatTime} from "../../util/time";

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

        if (!query) {
            return msg.util!.send(msg.embed().setTitle('검색어를 입력해주세요!').setFooter(''))
        }

        let player = this.client.music.players.get(msg.guild!.id)

        if (player) {
            if (msg.member!.voice.channelID !== player.voiceChannel) {
                return msg.util!.reply(msg.embed().setFooter('').setTitle('음악을 재생중인 채널에 들어가주세요!'))
            }
        }

        let track

        let shouldPlay = false

        const res = await this.client.music.search(query)

        console.log(`[MUSIC:SEARCH] User: ${msg.author.id} Guild: ${msg.guild!.id} Load Type: ${res.loadType} Query: ${query}`)

        if (res.loadType === 'NO_MATCHES') {
            return msg.util!.send(msg.embed().setTitle('검색 결과가 없어요!').setFooter(''))
        } else if (res.loadType === 'TRACK_LOADED') {
            const t = res.tracks[0]
            await msg.util!.send(msg.embed().setTitle('곡 추가').addField('제목', t.title, true).addField('길이', formatTime(t.duration), true).setImage(t.displayThumbnail('maxresdefault')))
            track = t
            shouldPlay = true
        }

        if (!shouldPlay) return

        if (!player) {
            player = this.client.music.create({
                guild: msg.guild!.id,
                textChannel: msg.channel.id,
                voiceChannel: msg.member!.voice.channelID
            })
        }

        player.connect()

        if (track) {
            player.queue.add(track)
        }

        if (!player.playing && !player.paused && !player.queue.length)
            player.play()

        if (
            !player.playing &&
            !player.paused &&
            player.queue.size === res.tracks.length
        )
            player.play()
    }
}
