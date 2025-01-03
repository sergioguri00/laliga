import express, { json } from 'express'
import { teamsRouter } from './routes/teams.js'
import { playersRouter } from './routes/players.js'
import { managersRouter } from './routes/managers.js'
import { stadiumsRouter } from './routes/stadiums.js'
import { matchesRouter } from './routes/matches.js'
import { leaguesRouter } from './routes/leagues.js'
import { teamMatchStatsRouter } from './routes/teammatchstats.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.use('/teams', teamsRouter)
app.use('/players', playersRouter)
app.use('/managers', managersRouter)
app.use('/stadiums', stadiumsRouter)
app.use('/matches', matchesRouter)
app.use('/leagues', leaguesRouter)
app.use('/teammatchstats', teamMatchStatsRouter)

app.use('/', (req, res) => {
  res.status(200).send('<h1>Bienvenido a la API de La Liga</h1>')
})
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
