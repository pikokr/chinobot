import SocketIO from "socket.io";
import config from '../../../config.json'

export default (io: SocketIO.Server) => {
    const ns = io.of('/bot')
    ns.use((socket, next) => {
        if (socket.handshake.query.auth === config.web.socket.namespaces.bot.secret) {
            return next()
        }
        socket.send({error: 'Unauthorized'})
        socket.disconnect(true)
    })
    ns.on('connection', async socket => {
        socket.on('response', (data: any) => {
            if (data.evt) {
                console.log(`[RESPONSE] Got response of request ${data.evt}`)
                const resolve = global.requestQueue.get(data.evt)
                if (resolve) {
                    resolve(data.data)
                    global.requestQueue.delete(data.evt)
                }
            }
        })
        console.log(`New bot connection: ${socket.id}`)
    })
    global.namespaces.bot = ns
}