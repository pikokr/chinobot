import {Socket} from "socket.io";

export default (socket: Socket, id: string, payload: any={}) => {
    return new Promise<any>(resolve => {
        const resId = `res.${Date.now() * Math.random() * Math.random()}`
        console.log(`[REQUEST] Sending socket.io request, id: ${resId} socket: ${socket.id}`)
        global.requestQueue.set(resId, resolve)
        socket.emit(id, {payload, event: resId})
    })
}