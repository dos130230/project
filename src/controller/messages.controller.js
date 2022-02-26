import path from 'path'
import fs from 'fs'


class MessageController {

    async GET(req, res, next) {
        const { toSend } = req.body
        // console.log(toSend)
        let messages = await req.fetch(`
                    select 
                        m.message_id,
                        u.user_id,
                        m.send_message,
                        m.file_type,
                        u.fullname,
                        u.username,
                        u.avatar_img
                    from messages as m
                    left join users as u on m.send_userId = u.user_id
                    where (m.send_userId = $1 and m.received_userId = $2) or  (m.send_userId = $2 and m.received_userId = $1)
                    order by m.message_id 
        `,req.user.user_id, +toSend)
        res.send(messages)
    }

    async POST(req, res, next) {
        try {
            let sentSocetData = []
            let sendUser = async (send_id, received_userId, message, mimetype) => {
                return await req.fetch(`
                insert into messages (
                    send_userId,
                    received_userId,
                    send_message,
                    file_type
                    ) 
                    values
                    ($1,$2,$3,$4) returning send_userId,received_userId,send_message,file_type
                    `, send_id, received_userId, message, mimetype)
            }
            const { received_userId, send_message } = req.body
            if (!(+received_userId)) throw new Error("Iltimos kimgaligin kiritng!")

            if (send_message && req.file) {
                const { originalname, mimetype, buffer, size } = req.file
                if (send_message.length > 8000 || send_message.length < 1) throw new Error("xabar belgisi 5<n<8000 bo'lishi shart")

                if (size / 2 ** 20 > 10) throw new Error("file hajmi 10 MB bo'lsin!")
                const fileName = Date.now() + originalname.replace(/\s/g, "")

                const filePath = path.join(process.cwd(), "upload", "file", fileName)
                let bufferWrite = fs.writeFileSync(filePath, buffer)

                let fileWrite = sendUser(req.user.user_id, +received_userId, ('/file/' + fileName), mimetype)
                let textWrite = sendUser(req.user.user_id, +received_userId, send_message, 'send/text')
                sentSocetData.push(fileWrite,textWrite)

            } else if (send_message && !req.file) {
                if (send_message.length > 8000 || send_message.length < 1) throw new Error("xabar belgisi 5<n<8000 bo'lishi shart")
                sentSocetData = await sendUser(req.user.user_id, +received_userId, send_message, 'send/text')
            } else {
                const { originalname, mimetype, buffer, size } = req.file
                if (size / 2 ** 20 > 10) throw new Error("file hajmi 10 MB bo'lsin!")
                const fileName = Date.now() + originalname.replace(/\s/g, "")
                const filePath = path.join(process.cwd(), "upload", "file", fileName)
                let bufferWrite = fs.writeFileSync(filePath, buffer)
                sentSocetData = await sendUser(req.user.user_id, +received_userId, ('/file/' + fileName), mimetype)
            }
            console.log(sentSocetData)
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    MessageController
}

