import {IResolvers} from 'graphql-tools'
import Guild from "../../../models/Guild";

export default {
    enable: async (source, args, context, info) => {
        const guild = (await Guild.findOne({id: source.id}))!
        if (guild.disabledCommands.includes(args.command)) return false
        await Guild.updateOne({id: guild.id}, {
            $push: {
                disabledCommands: args.command
            }
        })
        return true
    },
    disable: async (source, args, context, info) => {
        const guild = (await Guild.findOne({id: source.id}))!
        if (!guild.disabledCommands.includes(args.command)) return guild.disabledCommands
        guild.disabledCommands = guild.disabledCommands.filter(r=>r !== args.command)
        await guild.save()
        return guild.disabledCommands
    }
} as IResolvers