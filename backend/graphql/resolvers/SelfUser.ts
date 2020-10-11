import request from "../../util/request";

export default {
    guilds: async (source: any, args: any, ctx: any) => {
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