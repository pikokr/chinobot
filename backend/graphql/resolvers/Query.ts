import request, {broadcastEval} from "../../util/request";
import {req} from "../../util/rateLimit";
import {IResolvers} from 'graphql-tools'
import Guild from "../../../models/Guild";
import _ from 'lodash'

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
    },
    listGuilds: async (source, {page=1}) => {
        const guilds = await Guild.find({serverListEnabled: true})
        const data: any[] = []
        for (let guild of guilds) {
            const item = (await Promise.all(Object.values(global.namespaces.bot!.sockets).map(socket => request(socket, 'guild', {
                id: guild.id
            })))).find(r => r)
            if (item) {
                item.members = item.members.length
                item.roles = item.roles.length
                item.channels = item.channels.length
                item.invite = (await broadcastEval(`(() => {
                const guild = this.guilds.cache.find(r=>r.id === '${item.id}')
                if (!guild) return null
                return guild.fetchInvites().then(async res => {
                    let inv = res.find(r=>r.inviter.id === this.user.id)
                    if (inv) return inv.url
                        const ch = guild.systemChannel || guild.channels.cache.filter(r=>r.send).first()
                        if (!ch) return null
                        inv = await ch.createInvite({
                            maxUses: 0,
                            maxAge: 0
                        })
                        return inv.url
                }).catch(err=>err.message)
                })()`)).find((r: string|undefined)=>r)
                data.push(item)
            }
        }

        const pages = _.chunk(_.sortBy(data.filter(r=>r.invite), 'members'), 30)

        return {
            guilds: pages[page-1],
            pages: pages.length
        }
    }
} as IResolvers