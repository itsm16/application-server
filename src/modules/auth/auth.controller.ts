
import { Request, Response } from "express";
import * as authService from './auth.service.js'
import ApiResponse from "../../common/utils/api-response.js";
import jwt from 'jsonwebtoken'

const register = async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    ApiResponse.created(res, "User registered successfully", user);
}

const login = async (req: Request, res: Response) => {
    const user = await authService.login(req.body);

    const token = jwt.sign({id: user.id, email: user.email}, 'secret', {expiresIn: '2d'})
    const cookie = res.cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 60 * 24 * 2),
        secure: true,
        httpOnly: true,
        sameSite: "none"
    })

    ApiResponse.ok(res, "User logged in successfully", user);
}

const getMe = async (req: Request & { user?: { id: number; email: string } }, res: Response) => {
    const user = await authService.getMe(req);
    ApiResponse.ok(res, "User fetched successfully", user);
}

const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    ApiResponse.ok(res, "User logged out successfully");
}

export {
    register,
    login,
    getMe,
    logout
}