import { Router } from 'express'
import { TeamMatchStatsController } from '../controllers/teammatchstats.js'

export const teamMatchStatsRouter = Router()

teamMatchStatsRouter.get('/', TeamMatchStatsController.getAll)

teamMatchStatsRouter.post('/', TeamMatchStatsController.create)
