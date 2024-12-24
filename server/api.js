const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a la app de LaLiga (está en proceso)</h1>')
})

app.post('/match', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
