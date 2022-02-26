import express from "express";
import config from '../config.js'
import path from 'path'
import fs from 'fs'
import jwt from './utils/jwt.util.js'


import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json())


// static filelarni olib berish uchun
app.use(express.static(path.join(process.cwd(), 'upload')))

// //middlewares loading
import postgres from './middleware/postgres.connect.js'
app.use(postgres)

const httpServer = createServer(app);
const io = new Server(httpServer);

let allBrowserId = []

// // loading router
import allRouter from './router/allRouter.router.js'
app.use(allRouter)


// socket uchun postgres
import myFetch from './middleware/postgres.connect.js'
// console.log(myFetch)

app.use((req,res,next) => {
    res.send(fs.readFileSync(path.join(process.cwd(),"frontend",'index.html'),"utf-8"))
    next()
})


io.on("connection", (socket) => {
    try {
        console.log(socket.id)
        if (!socket.handshake.headers.token) throw new Error("Sizda token yo'q!")
        let parser = jwt.verify(socket.handshake.headers.token)
        allBrowserId.push({ ...parser, id: socket.id })

        socket.on('disconnect', (data) => {
            let index = allBrowserId.findIndex((el) => el.id == socket.id)
            allBrowserId.splice(index, 1)
        })

    } catch (error) {
        console.log(error)
    }
})



httpServer.listen(config.PORT, () => console.log('server is running http://localhost:5000'))









