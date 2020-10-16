import {Manager} from "erela.js";
import Client from "./Client";
import {NodeOptions} from "erela.js/structures/Node";
import {Payload} from "erela.js/structures/Manager";

export default class Music extends Manager {
    constructor(client: Client, nodes: NodeOptions[]) {
        super({
            nodes,
            send(id: string, payload: Payload) {
                const guild = client.guilds.cache.get(id)
                if (guild) guild.shard.send(payload)
            }
        })

        client.on('raw', args => this.updateVoiceState(args))

        console.log(`[Music] INIT...`)
    }
}