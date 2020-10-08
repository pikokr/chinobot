import {Listener} from "discord-akairo";
import {Guild} from "discord.js";
import GuildModel from '../models/Guild'

export default class Ready extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild: Guild) {
        if (await GuildModel.findOne({id: guild.id})) {
            console.log(`[DELETE] LEFT GUILD: ${guild.name}(${guild.id})`)
            await GuildModel.deleteMany({id: guild.id})
        }
    }
}