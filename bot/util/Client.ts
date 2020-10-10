import {AkairoClient, CommandHandler, ListenerHandler} from "discord-akairo";
import path from "path";
import config from '../../config.json'

export default class Client extends AkairoClient {
    commandHandler: CommandHandler

    listenerHandler: ListenerHandler

    constructor() {
        super({
            disableMentions: 'everyone',
            ownerID: config.owner,
            presence: {
                status: "online",
                afk: false,
                activity: {
                    name: `${config.prefix}도움말`,
                    type: 'LISTENING'
                }
            }
        })

        this.on('debug', console.debug)
        this.on('error', console.error)
        this.on('shardError', console.error)
        this.on('warn', console.warn)

        this.commandHandler = new CommandHandler(this, {
            directory: path.resolve(path.join(__dirname,'..','commands')),
            prefix: config.prefix,
            commandUtil: true
        })
        this.listenerHandler = new ListenerHandler(this, {
            directory: path.resolve(path.join(__dirname,'..','listeners'))
        })
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        })
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
    }
}