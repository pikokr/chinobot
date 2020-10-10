import {IResolvers} from 'graphql-tools'
import request from "../util/request";
import fetch from 'node-fetch'
import config from '../../config.json'
import jwt from 'jsonwebtoken'

export default {
    Query: {
        status: async () => {
            const sockets = Object.values(global.namespaces.bot!.sockets)
            const shards: any[] = []
            for (let socket of sockets) {
                (await request(socket,'shards')).forEach((i:any)=>shards.push(i))
            }
            return {shards}
        },
        me: async (source, args, context) => {
            if (!context.user) return null

            return {
                user: context.user.user
            }
        }
    },
    Mutation: {
        login: async (source, {code}) => {
            const data = {
                client_id: config.web.oauth2.clientID,
                client_secret: config.web.oauth2.clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: config.web.oauth2.callback,
                code: code,
                scope: 'identify guilds',
            };
            const res = (await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }))
            const json = await res.json()
            if (res.status !== 200) {
                return null
            }
            const result: any = {}
            result.user = await (await fetch('https://discord.com/api/users/@me', {
                headers: {
                    Authorization: `${json.token_type} ${json.access_token}`
                }
            })).json()
            result.user.tag = result.user.username + '#' + result.user.discriminator
            result.guilds = await (await fetch('https://discord.com/api/users/@me/guilds', {
                headers: {
                    Authorization: `${json.token_type} ${json.access_token}`
                }
            })).json()
            return jwt.sign(result, config.web.jwt)
        }
    },
    SelfUser: {
        guilds: async (source, args, ctx) => {
            const guilds = ctx.user.guilds

            let results = guilds instanceof Array ? (await Promise.all(guilds.map(async (guild: any) => {
                const fetched = (await Promise.all(Object.values(global.namespaces.bot!.sockets).map(socket => request(socket, 'guild', {
                    id: guild.id
                })))).find(r=>r)

                const value = fetched ? fetched[0] : null

                if (value) {
                    guild.members = value.members.length
                }

                guild.bot = Boolean(value)

                return guild
            }))).filter(value => {
                switch (args.type) {
                    case 'ADMIN':
                        return Boolean(value.permissions & 8)
                    case 'USER':
                    default:
                        return true
                }
            }) : []

            return results
        }
    }
} as IResolvers
