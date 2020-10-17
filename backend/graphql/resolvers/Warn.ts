import {IResolvers} from 'graphql-tools'
import {broadcastEval} from "../../util/request";
import Warn from '../../../models/Warn'

export default {
    delete: async (source) => {
        if (source instanceof Array) {
            return false
        }
        const item = await Warn.findOne({guild: source.guild, id: source.id})
        if (!item) return false
        await item.deleteOne()
        return true
    },
    member: async source => {
        return (await broadcastEval(`this.users.cache.get('${source.member.replace("'", "\\''")}')?.tag`)).find((r: string | undefined) => r)
    }
} as IResolvers