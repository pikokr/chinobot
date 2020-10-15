import {Command, Inhibitor} from "discord-akairo";
import {Message} from "discord.js";
import Guild from '../../models/Guild'

export default class DisabledInhibitor extends Inhibitor {
    constructor() {
        super('disabled', {
            reason: 'disabled'
        });
    }

    async exec(msg: Message, cmd?: Command): Promise<boolean> {
        if (!cmd) return false
        if (!msg.guild) return false
        const g = (await Guild.findOne({id: msg.guild.id}))!
        return g.disabledCommands.includes(cmd.id)
    }
}