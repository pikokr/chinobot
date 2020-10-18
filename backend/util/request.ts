import {Socket} from "socket.io";
import Client from "../../bot/util/Client";

const request = (socket: Socket, id: string, payload: any={}) => {
    return new Promise<any>(resolve => {
        const resId = `res.${Date.now() * Math.random() * Math.random()}`
        console.log(`[REQUEST] Sending socket.io request, id: ${resId} socket: ${socket.id}`)
        global.requestQueue.set(resId, resolve)
        socket.emit(id, {payload, event: resId})
    })
}

export default request

export async function broadcastEval(script: string|((client: Client)=>any)) {
    const data = (await Promise.all(Object.values(global.namespaces.bot!.sockets).map(socket => request(socket, 'eval', {
        script: typeof script === 'string' ? script : `(${script})(this)`
    }))))
    if (!data.length) return []
    return data.reduce((acc,cur) => [...acc,...cur])
}
