import express, { json } from 'express'
import { teamsRouter } from './routes/teams.js'
import { playersRouter } from './routes/players.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())
app.use('/teams', teamsRouter)
app.use('/players', playersRouter)

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
