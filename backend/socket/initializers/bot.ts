import SocketIO from "socket.io";
import config from '../../../config.json'
import request from "../../util/request";

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
        console.log(`New bot connection: ${socket.id}`)
    })
    global.namespaces.bot = ns
}