import { Router } from 'express'
import { StadiumController } from '../controllers/stadiums.js'

export const stadiumsRouter = Router()

stadiumsRouter.get('/', StadiumController.getAll)

stadiumsRouter.get('/:id', StadiumController.getById)

stadiumsRouter.get('/team/:teamId', StadiumController.getByTeam)

stadiumsRouter.post('/', StadiumController.create)

stadiumsRouter.patch('/:id', StadiumController.update)
