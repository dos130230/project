import { Router } from "express";
import {AuthContoller} from '../controller/auth.controller.js'
import {UserContoller} from '../controller/users.controller.js'
import {MessageController} from '../controller/messages.controller.js'
import TokenParser from '../middleware/token.parser.js'

import multer from "multer";
const avatarIMG = multer()

class AppRouter {
    constructor (){
        // barcha contollerlar ulanadi

        this.authController = new AuthContoller()
        this.userController = new UserContoller()
        this.messageController = new MessageController()
        this.router = Router()
        this.creatRouter()
    }

    creatRouter (){
        // barcha routerlar ulanadi

        this.router.post('/auth/login',this.authController.LOGIN)
        this.router.post('/auth/register',avatarIMG.single('avatar'),this.authController.REGISTER)
        this.router.get('/users',TokenParser,this.userController.GET)
        this.router.get('/messages',this.messageController.GET)
        

    }
}

let approuter = new AppRouter()

export default approuter.router 