import {Manager} from "erela.js";
import Client from "./Client";
import {Payload} from "erela.js/structures/Manager";
import config from '../../config.json'
import {MessageEmbed, TextChannel, VoiceChannel} from "discord.js";

export default class Music extends Manager {
    constructor(client: Client) {
        super({
            nodes: config.lavalink,
            send(id: string, payload: Payload) {
                const guild = client.guilds.cache.get(id)
                if (guild) guild.shard.send(payload)
            }
        })

        client.on('raw', args => {
            this.updateVoiceState(args)
        })

        const Embed = () => new MessageEmbed().setColor('BLUE')

        this.on('nodeConnect', node => console.log(`[MUSIC:MAIN] Connected to node ${node.options.host}:${node.options.port}`))
        this.on('nodeCreate', node => console.log(`[MUSIC:MAIN] Create node ${node.options.host}:${node.options.port}`))
        this.on('nodeDestroy', node => console.log(`[MUSIC:MAIN] Destroyed node ${node.options.host}:${node.options.port}`))
        this.on('nodeDisconnect', (node, reason) => console.log(`[MUSIC:MAIN] Disconnected from node ${node.options.host}:${node.options.port}. Reason: ${reason}`))
        this.on('nodeError', (node, error) => console.log(`[MUSIC:MAIN] Errored from node ${node.options.host}:${node.options.port}. Error: ${error.message}`))
        this.on('nodeRaw', payload => console.log(`[MUSIC:MAIN] Received payload: ${JSON.stringify(payload)}`))
        this.on('nodeReconnect', node => console.log(`[MUSIC:MAIN] Reconnecting to node ${node.options.host}:${node.options.port}...`))
        this.on('playerCreate', player => console.log(`[MUSIC:PLAYER] Created player on guild ${player.guild}. TextChannel: ${player.textChannel} VoiceChannel: ${player.voiceChannel}`))
        this.on('playerDestroy', player => console.log(`[MUSIC:PLAYER] Destroyed player on guild ${player.guild}`))
        this.on('playerMove', (player, oldChannel) => {
            if (client.channels.cache.get(oldChannel)) {
                return (<VoiceChannel>client.channels.cache.get(oldChannel)).join()
            }
        })
        this.on('queueEnd', player => {
            player.destroy()
            console.log(`[MUSIC:PLAYER] Queue ended on player in guild ${player.guild}`)
        })
        this.on('trackEnd', (player, track, payload) => {
            console.log(`[MUSIC:PLAYER] Track ended, guild: ${player.guild}, Track: ${track.title}, payload: ${JSON.stringify(payload)}`)
        })
        this.on('socketClosed', (player, payload) => {
            console.log(`[MUSIC:PLAYER] Socket closed, player: ${player.guild}, payload: ${JSON.stringify(payload)}`)
        })
        this.on('trackError', (player, track, payload) => {
            console.log(`[MUSIC:PLAYER] Track error, guild: ${player.guild} track: ${track.title} error: ${payload.error}`)
            player.stop();
            if(!player.playing) {
                player.play()
            }
            (<TextChannel|undefined>client.channels.cache.get(player.textChannel!))?.send(Embed().setTitle('곡이 스킵되었어요!').setDescription(`음악 재생중 오류가 발생해 스킵했어요.\n${payload.error}`))
        })
        this.on('trackStart', (player, track) => {
            console.log(`[MUSIC:PLAYER] Track start, guild: ${player.guild} track: ${track.title}`)
        })
        this.on('trackStuck', (player, track) => {
            console.log(`[MUSIC:PLAYER] Track stuck, guild: ${player.guild} track: ${track.title}`)
        })
        client.on('voiceStateUpdate', data => {
            if (data.channel) {
                if (data.channel.members.filter(r=>r.id !== client.user!.id).size === 0) {
                    if (this.players.get(data.guild.id)) {
                        const player = this.players.get(data.guild.id)!;
                        (<TextChannel|undefined>client.channels.cache.get(player.textChannel!))?.send(Embed().setTitle('음성 채널에 아무도 없어 채널을 나갔어요!'))
                        player.destroy()
                    }
                }
            }
        })

        console.log(`[Music] INIT...`)
    }
}