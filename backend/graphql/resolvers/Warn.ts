import {IResolvers} from 'graphql-tools'
import {broadcastEval} from "../../util/request";

export default {
    delete: async (source) => {
        console.log(source)
        return false
    },
    member: async source => {
        return (await broadcastEval(`this.users.cache.get('${source.member.replace("'", "\\''")}')?.tag`)).find((r: string | undefined) => r)
    }
} as IResolvers