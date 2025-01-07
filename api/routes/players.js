import { Router } from 'express'
import { PlayerController } from '../controllers/players.js'

export const playersRouter = Router()

playersRouter.get('/', PlayerController.getAll)

playersRouter.get('/:id', PlayerController.getById)

playersRouter.post('/', PlayerController.create)

playersRouter.patch('/:id', PlayerController.update)
