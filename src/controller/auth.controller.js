import jwt from '../utils/jwt.util.js'

class AuthContoller {
    async LOGIN (req,res,next) {
        try {
            const {username,password} = req.body
            if(!username || !password) throw new Error('username yoki password kiritilmadi!')
            let result = await req.fetch(`
                select
                    u.user_id,
                    u.username
                from users as u
                where u.username = $1 and password = crypt($2,u.password)
            `,username,password)

            if (!result.length) throw new Error("Bunday user topilmadi!")

            let agent = (req.headers['user-agent'])
            let user = result[0]
            user.agent = agent
            console.log(user)
            let token = jwt.sign(user)

            return res.status(201).json({
                message : 'LOGIN OK',
                data : user,
                token
            })

        }catch(error){
            console.log(error)
            res.send(error.message)
        }
    }

    async REGISTER (req,res) {
        console.log(req)
    }
}

export {
    AuthContoller
}