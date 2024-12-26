import { Router } from 'express'
import { TeamController } from '../controllers/teams.js'

export const teamsRouter = Router()

teamsRouter.get('/', TeamController.getAll)

teamsRouter.get('/:id', TeamController.getById)

teamsRouter.get('/:id/players', TeamController.getPlayers)
