import {Request, Response} from 'express'
import * as aiService from './ai.service.js'
import ApiResponse from '../../common/utils/api-response.js'

const parse = async (req: Request, res: Response) => {
    const parsed = await aiService.parse(req.body)
    ApiResponse.ok(res, "Parsed Successfully", parsed)
}

const createApplication = async (req: Request, res: Response) => {
    const application = await aiService.createApplication(req.body)
    ApiResponse.ok(res, "Application created successfully", application)
}

const applications = async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.id
    const applications = await aiService.getApplications(userId)
    ApiResponse.ok(res, "fetched applications successfully", applications)
}

const updateApplication = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status } = req.body
    if (!id || !status) {
        return res.status(400).json({message: "id and status are required"})
    }
    const application = await aiService.updateApplication(id as string, status)
    ApiResponse.ok(res, "Application updated successfully", application)
}

export {
    parse,
    createApplication,
    applications,
    updateApplication
}
