import { Router } from 'express'
import { PlayerModel } from '../models/player.js'

export const playersRouter = Router()

playersRouter.get('/', async (req, res) => {
  const { name, lastName, number, height, country, position, team } = req.query
  const players = await PlayerModel.getAll({ name, lastName, number, height, country, position, team })
  res.json(players)
})

playersRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const player = await PlayerModel.getById(id)
  if (player) return res.json(player)
  res.status(404).send('<h1> 404 Error Not Found </h1>')
})
