
class AuthContoller {
    async LOGIN (req,res) {
        console.log(await req.fetch('select user_id from users'))
    }

    async REGISTER (req,res) {
        console.log(req)
    }
}

export {
    AuthContoller
}