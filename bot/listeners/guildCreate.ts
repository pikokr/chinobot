import {Listener} from "discord-akairo";
import {Guild} from "discord.js";
import GuildModel from '../../models/Guild'

export default class Ready extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild: Guild) {
        if (!await GuildModel.findOne({id: guild.id})) {
            console.log(`[INSERT] NEW GUILD: ${guild.name}(${guild.id})`)
            const g = new GuildModel()
            g.id = guild.id
            await g.save()
        }
    }
}