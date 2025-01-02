import { Router } from 'express'
import { MatchController } from '../controllers/matches.js'

export const matchesRouter = Router()

matchesRouter.get('/', MatchController.getAll)

matchesRouter.get('/:id', MatchController.getById)

matchesRouter.post('/', MatchController.create)

matchesRouter.patch('/:id', MatchController.update)
