import { Router } from 'express'
import { readJSON } from './utils.js'

const players = readJSON('../data/players.json')

export const playersRouter = Router()

playersRouter.get('/', (req, res) => {
  res.json(players)
})

playersRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const player = players.find(player => player.id === parseInt(id))
  if (player) return res.json(player)
  res.status(404).send('<h1> 404 Error Not Found </h1>')
})
