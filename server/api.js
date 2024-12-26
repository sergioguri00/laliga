import teams from './data/teams.json' with { type: 'json' }
import players from './data/players.json' with { type: 'json' }
import express, { json } from 'express'
const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')

app.use(json())

// GET main page
app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a la app de LaLiga (está en proceso)</h1>')
})

// GET all teams
app.get('/teams', (req, res) => {
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

// GET specific team
app.get('/teams/:id', (req, res) => {
  const { id } = req.params
  const team = teams.find(team => team.id === parseInt(id))
  if (team) return res.json(team)
  res.status(404).send('<h1> 404 Error Not Found </h1>')
})

// GET all players from a team
app.get('/teams/:id/players', (req, res) => {
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

// GET all players
app.get('/players', (req, res) => {
  res.json(players)
})

// GET specific team
app.get('/players/:id', (req, res) => {
  const { id } = req.params
  const player = players.find(player => player.id === parseInt(id))
  if (player) return res.json(player)
  res.status(404).send('<h1> 404 Error Not Found </h1>')
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
