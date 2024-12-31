import { Router } from 'express'
import { ManagerController } from '../controllers/managers.js'

export const teamsRouter = Router()

teamsRouter.get('/', ManagerController.getAll)

teamsRouter.get('/:id', ManagerController.getById)

teamsRouter.post('/', ManagerController.create)

teamsRouter.patch('/:id', ManagerController.update)
