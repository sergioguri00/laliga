import { Router } from 'express'
import { TeamModel } from '../models/team.js'

export const teamsRouter = Router()

teamsRouter.get('/', async (req, res) => {
  const { name, year, city, mainColor } = req.query
  const filteredTeams = await TeamModel.getAll({ name, year, city, mainColor })
  res.json(filteredTeams)
})

teamsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const team = await TeamModel.getById(id)
  if (team) return res.json(team)
  res.status(404).send('<h1> 404 Error Not Found </h1>')
})

teamsRouter.get('/:id/players', async (req, res) => {
  const { id } = req.params
  const players = await TeamModel.getPlayers(id)
  if (players) return res.json(players)
  res.status(404).send('<h1> 404 Error Not Found </h1>')
})
