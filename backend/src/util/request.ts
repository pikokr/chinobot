import {Socket} from "socket.io";

export default (socket: Socket, id: string, payload: any={}) => {
    return new Promise(resolve => {
        const resId = `res.${Date.now() * Math.random() * Math.random()}`
        socket.once(resId, args => resolve(args))
        socket.emit(id, {payload, event: resId})
    })
}