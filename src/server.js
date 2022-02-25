import express from 'express'
import config from '../config.js'

const app = express()
app.use(express.json())

// loading router
import allRouter from './router/allRouter.router.js'
app.use(allRouter)

app.listen(config.PORT,() => console.log('server is running http://localhost:5000'))