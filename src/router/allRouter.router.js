import { Router } from "express";
import {AuthContoller} from '../controller/auth.controller.js'
import multer from "multer";
const avatarIMG = multer()

class AppRouter {
    constructor (){
        // barcha contollerlar ulanadi

        this.authController = new AuthContoller()
        this.router = Router()
        this.creatRouter()
    }

    creatRouter (){
        // barcha routerlar ulanadi
        
        this.router.post('/auth/login',this.authController.LOGIN)
        this.router.post('/auth/register',avatarIMG.single('avatar'),this.authController.REGISTER)
    }
}

let approuter = new AppRouter()

export default approuter.router 