const PORT = process.env.PORT || 5000

const POOL = {
    host : 'localhost',
    user : 'postgres',
    database : 'feedback',
    password : '130230'
}

export default {
    PORT,
    POOL
}