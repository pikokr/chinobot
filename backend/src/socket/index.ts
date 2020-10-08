import SocketIO from "socket.io";
import {Express} from "express";
import bot from "./initializers/bot";

export default (app: Express, io: SocketIO.Server) => {
    bot(io)
}