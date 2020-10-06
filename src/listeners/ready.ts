import {Listener} from "discord-akairo";

export default class Ready extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        console.log(`Shard #${this.client.shard!.ids.reduce((acc,cur)=>acc+cur)} ready.`)
    }
}