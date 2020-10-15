import {AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler} from "discord-akairo";
import path from "path";
import config from '../../config.json'

export default class Client extends AkairoClient {
    commandHandler: CommandHandler

    listenerHandler: ListenerHandler

    inhibitorHandler: InhibitorHandler

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
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: path.resolve(path.join(__dirname,'..','inhibitors'))
        })
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            inhibitorHandler: this.inhibitorHandler
        })
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
        this.inhibitorHandler.loadAll()
    }
}