import express from "express";
import config from '../config.js'
import path from 'path'


import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json())

// static filelarni olib berish uchun
app.use(express.static(path.join(process.cwd(),'upload')))

// //middlewares loading
import postgres from './middleware/postgres.connect.js'
app.use(postgres)


// // loading router
import allRouter from './router/allRouter.router.js'
app.use(allRouter)



const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log(socket.id)
    
    socket.on('olov', (data) => {
        io.emit('new message', 10000)
        console.log(data)
    })

    // socket.on('disconnect', () => {
    //     console.log('Brat chiqib ketdi!')
    // })
})

httpServer.listen(config.PORT,() => console.log('server is running http://localhost:5000'))









