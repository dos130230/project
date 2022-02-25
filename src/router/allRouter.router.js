import { Router } from "express";
import {AuthContoller} from '../controller/auth.controller.js'

class AppRouter {
    constructor (){
        // barcha contollerlar ulanadi
        this.authController = new AuthContoller()
        this.router = Router()
        this.creatRouter()
    }

    creatRouter (){
        // barcha routerlar ulanadi
        this.router.get('/home',this.authController.LOGIN)
    }
}

let approuter = new AppRouter()

export default approuter.router 