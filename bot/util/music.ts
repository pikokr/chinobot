import {Shoukaku} from "shoukaku";
import {EventEmitter} from "events";
import {Client} from "discord.js";

export class Queue extends EventEmitter {
    music: Music
    client: Client

    classPrefix: string

    prefixes: {
        get: string
        enQueue: string
        deQueue: string
        playNext: string
        play: string
        setNowPlaying: string
        skip: string
    }

    constructor(music: Music) {
        super()
        this.music = music
        this.client = music.client

        this.classPrefix = `${music.prefix}:QUEUE`

        this.prefixes = {
            get: `${this.classPrefix}:GET]`,
            deQueue: `${this.classPrefix}:DeQueue]`,
            enQueue: `${this.classPrefix}:EnQueue]`,
            play: `${this.classPrefix}:Play]`,
            playNext: `${this.classPrefix}:PlayNext]`,
            setNowPlaying: `${this.classPrefix}:SetNowPlaying]`,
            skip: `${this.classPrefix}:Skip]`,
        }
    }

    get(guildID: string) {
        console.log(`${this.prefixes.get} [${guildID}] Getting Queue`)
    }
}

export default class Music extends Shoukaku {
    prefix = "[Music:Default"

    logPrefixes = {
        default: `${this.prefix}:LOG]`,
        join: `${this.prefix}:JOIN]`,
        leave: `${this.prefix}:LEAVE]`,
        stop: `${this.prefix}:STOP]`,
        handleDisconnect: `${this.prefix}:HandleDisconnect]`,
        setPlayerDefaultSetting: `${this.prefix}:setPlayerDefaultSetting]`,
        setVolume: `${this.prefix}:setVolume]`,
        getRelated: `${this.prefix}:getRelated]`,
        getUsableNodes: `${this.prefix}:getUsableNodes]`,
        is429: `${this.prefix}:is429]`,
        moveNode: `${this.prefix}:moveNode]`
    }

    constructor(...args: any) {
        // @ts-ignore
        super(...args);

        console.log(`${this.logPrefixes.default} INIT...`)



        this.on('ready', name => console.log(`Node ${name} ready`))
        this.on('error', (name, error) => console.error(`Error from node ${name}: ${error.message}`))
        this.on('close', (name, code, reason) => console.warn(`Node ${name} disconnected. Reason: ${reason}, code: ${code}`))
        this.on('disconnected', (name, reason) => console.warn(`Node ${name} Disconnected, Reason ${reason}`))
    }
}