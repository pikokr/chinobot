import {Router} from "express";
import request from "../../util/request";

const router = Router()

router.get('/shards',async (req, res) => {
    const socket = Object.values(global.namespaces.bot!.sockets)[0]
    if (!socket) {
        return res.json({error: 'Bot is not connected to this server'})
    }
    res.json(await request(socket, 'shards'))
})

export default router
