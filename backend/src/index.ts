import express from 'express'
import config from '../../config.json'
import http from 'http'
import sio, {Namespace} from 'socket.io'
import socket from './socket'
import {ApolloServer} from "apollo-server-express";
import schema from './graphql/schema'

global.namespaces = {}

const app = express()

const apollo = new ApolloServer({
    schema
})

apollo.applyMiddleware({app, path: '/graphql'})

app.use(express.json())

app.use('/', require('./routes').default)

const server = http.createServer(app)

const io = sio(server)

socket(app,io)

server.listen(config.web.port, () => console.log(`Listening on port ${config.web.port}`))

declare global {
    namespace NodeJS {
        interface Global {
            namespaces: {
                bot?: Namespace
            }
        }
    }
}
