import { Router } from 'express'
import { PlayerController } from '../controllers/players'

export const playersRouter = Router()

playersRouter.get('/', PlayerController.getAll)

playersRouter.get('/:id', PlayerController.getById)
