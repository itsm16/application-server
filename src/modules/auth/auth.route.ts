import {Router} from 'express'
import * as authController from './auth.controller.js'
import validate from '../../common/middleware/validate.middleware.js'
import { LoginDto, RegisterDto } from './dto/auth.dto.js'
import { checkToken } from './auth.middleware.js'

const authRoutes: Router = Router()

authRoutes.get("/test", checkToken, (req, res) => {
    res.send("Hello World")
})

authRoutes.post("/register", validate(RegisterDto), authController.register)
authRoutes.post("/login", validate(LoginDto), authController.login)
authRoutes.get("/me", checkToken, authController.getMe)
authRoutes.post("/logout", authController.logout)

export default authRoutes