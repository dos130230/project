
class UserContoller {
    async GET(req, res, next) {
        let users = await req.fetch(`
            select 
                user_id,
                fullname,
                username,
                avatar_img
            from users
            where user_id<>$1;
        `, req.user.user_id)
        res.send(users)
    }
}
export {
    UserContoller
}