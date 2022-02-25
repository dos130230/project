import jwt from 'jsonwebtoken'

export default {
    sign : (data) => {
        return jwt.sign(data,process.env.TOKEN_KEY)
    },
    verify : (token) => {
        try{
            return jwt.verify(token,process.env.TOKEN_KEY)
        }catch(error){
            console.log(error)
        }   
    }
}