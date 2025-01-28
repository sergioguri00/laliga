import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://localhost:4321',
]

export const corsMiddleware = () => cors({
  origin: '*'
})
