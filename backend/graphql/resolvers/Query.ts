import request from "../../util/request";
import {req} from "../../util/rateLimit";

export default {
    status: async () => {
        const sockets = Object.values(global.namespaces.bot!.sockets)
        const shards: any[] = []
        for (let socket of sockets) {
            (await request(socket, 'shards')).forEach((i: any) => shards.push(i))
        }
        return {shards}
    },
    me: async (source: any, args: any, context: any) => {
        if (!context.user) return null
        context.user.guilds = await (await req('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${context.user.accessToken}`
            }
        })).json()

        return {
            user: context.user.user
        }
    },
    guild: async (source: any, args: any, context: any) => {
        if (!context.user) return null
        const guilds = await (await req('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${context.user.accessToken}`
            }
        })).json()
        if (!guilds.find((r: any) => r.id === args.id) || ((guilds.find((r: any) => r.id === args.id).permissions & 8) === 0)) {
            return null
        }
        args.id.replace('"', '\\"')
        const data = (await Promise.all(Object.values(global.namespaces.bot!.sockets).map(socket => request(socket, 'guild', {
            id: args.id
        })))).find(r => r)
        if (data) {
            data.members = data.members.length
            data.roles = data.roles.length
            data.channels = data.channels.length
        }
        return data
    }
}