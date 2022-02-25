const PORT = process.env.PORT || 5000
import {config} from 'dotenv'
config()
const POOL = {
    host : 'localhost',
    user : 'postgres',
    database : 'chat_messages',
    password : '130230'
}

export default {
    PORT,
    POOL
}