import express from 'express'
import config from '../config.json'
import http from 'http'
import sio, {Namespace} from 'socket.io'
import socket from './socket'
import {ApolloServer} from "apollo-server-express";
import schema from './graphql/schema'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import {connect} from "mongoose";

global.namespaces = {}

global.requestQueue = new Map()

const app = express()

app.use(cors({
    origin: '*'
}))

const apollo = new ApolloServer({
    schema,
    context: ({req}) => {
        if (!req.headers.authorization || !(<string>req.headers.authorization).startsWith('Bearer ')) {
            return {
                user: null
            }
        }
        try {
            const user = jwt.verify(req.headers.authorization.slice('Bearer '.length), config.web.jwt)
            return {
                user: user
            }
        } catch (e) {
            return {
                user: null
            }
        }
    }
})

apollo.applyMiddleware({app, path: '/graphql'})

app.use(express.json())

app.use('/', require('./routes').default)

const server = http.createServer(app)

const io = sio(server)

socket(app,io)

connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    server.listen(config.web.port, () => console.log(`Listening on port ${config.web.port}`))
})

declare global {
    namespace NodeJS {
        interface Global {
            namespaces: {
                bot?: Namespace
            }
            requestQueue: Map<string, (data: any)=>void>
        }
    }
}

process.on('SIGINT', () => {
    server.close()
})

