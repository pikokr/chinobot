import * as devConfig from './config.dev'

const isDev = process.env.NODE_ENV !== 'production'

export const GRAPHQL_URL = isDev ? devConfig.GRAPHQL_URL : 'https://chino-api.piko.app/graphql'
export const LOGIN_URL = isDev ? devConfig.LOGIN_URL : 'https://discord.com/api/oauth2/authorize?client_id=762649011404406814&redirect_uri=https://chino.piko.app/auth/callback&response_type=code&scope=identify guilds'
export const INVITE_URL = isDev ? devConfig.INVITE_URL : 'https://discord.com/api/oauth2/authorize?client_id=762649011404406814&scope=bot&response_type=code&permissions=8&redirect_uri=https://chino.piko.app/invite/callback'
