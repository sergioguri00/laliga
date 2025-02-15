import { Router } from 'express'
import { LeagueController } from '../controllers/leagues.js'

export const leaguesRouter = Router()

leaguesRouter.get('/', LeagueController.getAll)

leaguesRouter.get('/:id', LeagueController.getById)

leaguesRouter.get('/:id/table', LeagueController.getTable)

leaguesRouter.get('/:id/lastMatchday', LeagueController.getLastMatchday)

leaguesRouter.get('/:id/matchday/:matchday', LeagueController.getMatchday)

leaguesRouter.get('/:id/stats', LeagueController.getStats)
