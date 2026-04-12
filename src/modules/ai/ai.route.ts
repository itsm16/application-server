import {Router} from 'express'
import validate from '../../common/middleware/validate.middleware.js'
import * as aiController from './ai.controller.js'
import { checkToken } from '../auth/auth.middleware.js'
import { ApplicationDto, ParseDescDto } from './dto/ai.dto.js'

const aiRoutes: Router = Router()

aiRoutes.post("/parse", checkToken, validate(ParseDescDto), aiController.parse)
aiRoutes.post("/applications", checkToken, validate(ApplicationDto), aiController.createApplication)
aiRoutes.get("/applications", checkToken, aiController.applications)
aiRoutes.put("/applications/:id", checkToken, aiController.updateApplication)

export default aiRoutes