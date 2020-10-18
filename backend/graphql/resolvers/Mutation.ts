import config from "../../../config.json";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

export default {
    login: async (source: any, {code}: any) => {
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
        result.accessToken = json.access_token
        return jwt.sign(result, config.web.jwt)
    },
    invite: async (source: any, {code}: any) => {
        const data = {
            client_id: config.web.oauth2.clientID,
            client_secret: config.web.oauth2.clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: config.web.invite,
            code: code,
            scope: 'bot',
        };
        const res = (await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }))
        return res.status === 200
    }
}