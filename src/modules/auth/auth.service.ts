import { eq } from "drizzle-orm"
import db from "../../common/db/db.js"
import { usersTable } from "../../common/db/schema.js"
import ApiError from "../../common/utils/api-error.js"
import { LoginDtoType, RegisterDtoType } from "./dto/auth.dto.js"
import {Request} from 'express'
import bcrypt from 'bcrypt'

const register = async ({name, email, password} : RegisterDtoType) => {
    const hashedPassword = await bcrypt.hash(password, 10)
 
    const user = await db.insert(usersTable).values({
        name,
        email,
        password: hashedPassword
    })

    if (!user) {
        throw ApiError.internal('User not created')
    }

    return {name, email}
}

const login = async ({email, password}: LoginDtoType) => {
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if (existing.length === 0) {
        throw ApiError.notFound('User not found')
    }

    const existingUser = existing[0]
    const isMatch = await bcrypt.compare(password, existingUser?.password as string)
    
    if (!isMatch) {
        throw ApiError.badRequest('Invalid password')
    }

    return {id: existingUser?.id, name: existingUser?.name, email: existingUser?.email}
}

const getMe = async (req: Request & {user?: {id:number, email: string}}) => {
    return req.user
}

export {
    register,
    login,
    getMe
}
