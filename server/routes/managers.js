import { Router } from 'express'
import { ManagerController } from '../controllers/managers.js'

export const managersRouter = Router()

managersRouter.get('/', ManagerController.getAll)

managersRouter.get('/:id', ManagerController.getById)

managersRouter.post('/', ManagerController.create)

managersRouter.patch('/:id', ManagerController.update)
