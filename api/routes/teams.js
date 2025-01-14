import { Router } from 'express'
import { TeamController } from '../controllers/teams.js'

export const teamsRouter = Router()

teamsRouter.get('/', TeamController.getAll)

teamsRouter.get('/:id', TeamController.getById)

teamsRouter.get('/:id/players', TeamController.getPlayers)

teamsRouter.get('/:id/stadium', TeamController.getStadium)

teamsRouter.get('/:id/manager', TeamController.getManager)

teamsRouter.get('/:id/matches', TeamController.getMatches)

teamsRouter.post('/', TeamController.create)

teamsRouter.patch('/:id', TeamController.update)

teamsRouter.delete('/:id', TeamController.delete)
