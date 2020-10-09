import {IResolvers} from 'graphql-tools'
import request from "../util/request";

export default {
    Query: {
        status: async () => {
            const sockets = Object.values(global.namespaces.bot!.sockets)
            const shards: any[] = []
            for (let socket of sockets) {
                (await request(socket,'shards')).forEach((i:any)=>shards.push(i))
            }
            return {shards}
        }
    }
} as IResolvers
