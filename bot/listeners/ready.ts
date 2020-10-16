import {Listener} from "discord-akairo";
import GuildModel from "../../models/Guild";

export default class Ready extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        console.log(`Shard #${this.client.shard!.ids.reduce((acc,cur)=>acc+cur)} ready.`)
        this.client.music.init(this.client.user!.id)
        for (let guild of this.client.guilds.cache.values()) {
            if (!await GuildModel.findOne({id: guild.id})) {
                console.log(`[INSERT] NEW GUILD: ${guild.name}(${guild.id})`)
                const g = new GuildModel({id:guild.id})
                await g.save()
            }
        }
    }
}