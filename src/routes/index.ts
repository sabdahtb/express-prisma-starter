import { type Express } from 'express'
import v1Routes from './v1'

function routes(app: Express) {
  app.get('/', (_req, res) => {
    res.json({ message: 'Hello World' })
  })

  app.use('/v1', v1Routes)
}

export default routes
