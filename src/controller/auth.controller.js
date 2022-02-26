import jwt from '../utils/jwt.util.js'
import path from 'path'
import fs from 'fs'

class AuthContoller {
    async LOGIN(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username || !password) throw new Error('username yoki password kiritilmadi!')
            let result = await req.fetch(`
                select
                    u.user_id,
                    u.username
                from users as u
                where u.username = $1 and password = crypt($2,u.password)
            `, username, password)

            if (!result.length) throw new Error("Bunday user topilmadi!")

            let agent = (req.headers['user-agent'])
            let user = result[0]
            user.agent = agent
            console.log(user)
            let token = jwt.sign(user)

            return res.status(201).json({
                message: 'LOGIN OK',
                data: user,
                token
            })

        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }

    async REGISTER(req, res, next) {
        try {
            const { fullname, username, password } = req.body

            if (!fullname || !username || !password) throw new Error("Forma bo'sh bolmasim")

            if (fullname.length > 64 || fullname.length < 5) throw new Error("fullname belgisi 5<n<64 bo'lishi shart")
            if (username.length > 32 || username.length < 5) throw new Error("username belgisi 5<n<32 bo'lishi shart")
            if (password.length > 128 || password.length < 5) throw new Error("password belgisi 5<n<128 bo'lishi shart!")
            if(!req.file) throw new Error("Rasm kiritish kerak!")
            
            const { originalname, mimetype, buffer ,size} = req.file
            if(size/2**20 > 10) throw new Error("file hajmi 10 MB bo'lsin!")
            const fileName = Date.now() +originalname.replace(/\s/g,"")

            let result = await req.fetch(`
                insert into users (
                    fullname,
                    username,
                    password,
                    avatar_img
                    ) 
                values
                    ($1,$2,crypt($3,gen_salt('bf')),$4)
                returning user_id, username

            `,fullname,username,password,'/avatar/'+fileName)
                console.log(result)
            let agent = (req.headers['user-agent'])
            let newUser = result[0]
            newUser.agent = agent

            let token = jwt.sign(newUser)
            const filePath = path.join(process.cwd(),"upload","avatar",fileName)

            let bufferWrite = fs.writeFileSync(filePath,buffer)

            return res.status(201).json({
                message: 'LOGIN OK',
                data: newUser,
                token
            })

        } catch (error) {
            console.log(error)
        }
    }
}
export {
    AuthContoller
}