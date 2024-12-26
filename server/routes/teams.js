import { Router } from 'express'
import { readJSON } from './utils.js'

const teams = readJSON('../data/teams.json')

export const teamsRouter = Router()

teamsRouter.get('/', (req, res) => {
  const { year, city } = req.query
  let filteredTeams = teams
  if (year) {
    filteredTeams = filteredTeams.filter(
      team => team.year === parseInt(year)
    )
  }
  if (city) {
    filteredTeams = filteredTeams.filter(
      team => team.city.toLowerCase() === city.toLowerCase()
    )
  }
  res.json(filteredTeams)
})

teamsRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const team = teams.find(team => team.id === parseInt(id))
  if (team) return res.json(team)
  res.status(404).send('<h1> 404 Error Not Found </h1>')
})

teamsRouter.get('/:id/players', (req, res) => {
  const { id } = req.params
  const team = teams.find(team => team.id === parseInt(id))
  if (team) {
    const teamplayers = teams.filter(
      player => player.team === parseInt(id)
    )
    return res.json(teamplayers)
  }
  res.status(404).send('<h1> 404 Error Not Found </h1>')
})
