import {IResolvers} from 'graphql-tools'
import request from "../util/request";
import fetch, {Response} from 'node-fetch'
import config from '../../config.json'
import jwt from 'jsonwebtoken'
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

export default {
    Query,
    Mutation,
    SelfUser: {
        guilds: async (source, args, ctx) => {
            const guilds = ctx.user.guilds

            const fetched0 = ((await Promise.all(Object.values(global.namespaces.bot!.sockets).map(socket => request(socket, 'guilds', {
                guilds: guilds.map((r: any)=>r.id)
            })))) || [])

            let fetched: any[] = []

            for (const i of fetched0) {
                fetched = [...fetched, ...i]
            }

            return guilds instanceof Array ? (guilds.map((guild: any) => {
                const g = fetched.find((r: any)=>r?.id === guild.id)

                const value = g ? g : null

                if (value) {
                    guild.members = value.members.length
                }

                guild.bot = Boolean(value)

                return guild
            })).filter((guild: any) => {
                switch (args.type) {
                    case 'ADMIN':
                        return Boolean(Number(guild.permissions) & 8)
                    case 'USER':
                    default:
                        return true
                }
            }) : []
        }
    }
} as IResolvers