import {Listener} from "discord-akairo";
import {Message} from "discord.js";

export default class Ready extends Listener {
    constructor() {
        super('commandError', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    async exec(err: Error, msg: Message) {
        console.error(err.stack)
    }
}