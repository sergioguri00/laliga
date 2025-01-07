import { Router } from 'express'
import { MatchController } from '../controllers/matches.js'

export const matchesRouter = Router()

matchesRouter.get('/', MatchController.getAll)

matchesRouter.get('/:matchdate,:localTeam,:awayTeam,:stadium,:matchday', MatchController.getMatch)

matchesRouter.post('/', MatchController.create)
