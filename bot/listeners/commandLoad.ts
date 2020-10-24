import {Command, Listener} from "discord-akairo";
import Inko from 'inko'
const inko = new Inko()

export default class CommandLoad extends Listener {
    constructor() {
        super('commandLoad', {
            emitter: 'commandHandler',
            event: 'load'
        });
    }

    async exec(cmd: Command) {
        cmd.aliases.forEach(alias => {
            cmd.aliases.push(inko.ko2en(alias))
            cmd.aliases.push(inko.en2ko(alias))
            cmd.aliases = Array.from(new Set(cmd.aliases))
        })
        cmd.aliases.forEach(alias => cmd.handler.aliases.set(alias, cmd.id))
    }
}