import {Router} from "express";
import request from "../../util/request";

const router = Router()

router.get('/shards',async (req, res) => {
    const sockets = Object.values(global.namespaces.bot!.sockets)
    const result: any[] = []
    for (let socket of sockets) {
        (await request(socket,'shards')).forEach((i:any)=>result.push(i))
    }
    res.json(result)
})

export default router
