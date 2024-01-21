import cors from 'cors'
import helmet from 'helmet'
import express, { type Express } from 'express'

const app: Express = express()

app.use(express.json())
app.use(helmet())
app.use(
  cors({
    // origin: ['*'],
    credentials: true,
  }),
)

export default app
