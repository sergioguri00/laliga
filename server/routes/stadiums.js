import { Router } from 'express'
import { StadiumController } from '../controllers/managers.js'

export const teamsRouter = Router()

teamsRouter.get('/', StadiumController.getAll)

teamsRouter.get('/:id', StadiumController.getById)

teamsRouter.post('/', StadiumController.create)

teamsRouter.patch('/:id', StadiumController.update)
