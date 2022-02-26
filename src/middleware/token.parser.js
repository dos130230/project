import jwt from '../utils/jwt.util.js'

export default (req,res,next) => {
    try {
        let token = req.headers.token
        if (!token)  throw new Error("Sizda token mavjud emas!")
        let parser = jwt.verify(token)
        const {agent} = parser
        // if(agent!==req.headers['user-agent'])  throw new Error("Sizning token ko'chirlgan token!")
        
        // console.log(req.headers['user-agent'])
        req.user = parser
        
        return next()
    }catch(error){
        res.json(error.message)
        // console.log(error)
    }
}