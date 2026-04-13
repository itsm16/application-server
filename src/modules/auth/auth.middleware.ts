import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import db from '../../common/db/db.js'
import { usersTable } from '../../common/db/schema.js'
import { eq } from 'drizzle-orm'
import ApiError from '../../common/utils/api-error.js'

const checkToken = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const token = req.cookies?.token
        
    if (!token) {
        throw ApiError.unauthorized("No token provided")
    }

    const decoded = jwt.verify(token, process.env.SECRET as string) as {id: number, email: string}

    if (!decoded) {
        throw ApiError.unauthorized("Invalid token")
    }

    const existingUser = await db.select().from(usersTable).where(eq(usersTable.id, decoded.id))

    if (existingUser.length === 0) {
        throw ApiError.unauthorized("Invalid token")
    }

    const user = existingUser[0]
    req.user = decoded
            
    next()
}

export {
    checkToken
}