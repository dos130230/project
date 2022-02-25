import jwt from 'jsonwebtoken'

export default {
    sign: (data) => {
        return jwt.sign(data, process.env.TOKEN_KEY)
    },
    verify: (token) => {
        return jwt.verify(token, process.env.TOKEN_KEY)
    }
}