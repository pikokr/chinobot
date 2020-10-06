import {ShardingManager} from "discord.js";
import * as path from "path";
import config from '../config.json'

const manager = new ShardingManager(path.join(__dirname, 'bot.ts'), {
    execArgv: [
        '-r',
        'ts-node/register'
    ],
    token: config.token
})

manager.on('shardCreate', shard => console.log(`Shard #${shard.id} created`))

manager.spawn()
