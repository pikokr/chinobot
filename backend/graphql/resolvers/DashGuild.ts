import {IResolvers} from 'graphql-tools'
import Guild from "../../../models/Guild";

export default {
    disable: async (source, args, context, info) => {
        const guild = (await Guild.findOne({id: source.id}))!
        if (guild.disabledCommands.includes(args.command)) return guild.disabledCommands
        await Guild.updateOne({id: guild.id}, {
            $push: {
                disabledCommands: args.command
            }
        })
        return guild.disabledCommands
    },
    enable: async (source, args, context, info) => {
        const guild = (await Guild.findOne({id: source.id}))!
        if (!guild.disabledCommands.includes(args.command)) return guild.disabledCommands
        guild.disabledCommands = guild.disabledCommands.filter(r=>r !== args.command)
        await guild.save()
        return guild.disabledCommands
    },
    disabled: async (source, args, context, info) => {
        const data = await Guild.findOne({id: source.id})
        if (!data) return []
        return data.disabledCommands
    }
} as IResolvers