import {Command, Inhibitor} from "discord-akairo";
import {Message} from "discord.js";

export default class DisabledInhibitor extends Inhibitor {
    constructor() {
        super('dm', {
            reason: 'dm'
        });
    }

    exec(msg: Message, cmd?: Command): boolean {
        return !msg.guild
    }
}