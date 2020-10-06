import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Reload extends Command {
    constructor() {
        super('리로드', {
            aliases: ['reload', 'rl', '리로드'],
            ownerOnly: true
        });
    }
    async exec(msg: Message) {
        Object.keys(require.cache).filter(r=>!r.includes('node_modules')).forEach(r=>delete require.cache[r])
        this.client.commandHandler.categories.map(r=>r.removeAll())
        this.client.listenerHandler.categories.map(r=>r.removeAll())
        this.client.commandHandler.categories.clear()
        this.client.listenerHandler.categories.clear()
        this.client.commandHandler.loadAll()
        this.client.listenerHandler.loadAll()
        await msg.react('✅')
    }
}