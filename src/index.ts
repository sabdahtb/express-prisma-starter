import app from './app'
import routes from './routes'
import env from './config/env'
import logger from './config/logger'

const server = app.listen(env.port, async () => {
  routes(app)

  logger.log('info', `Server is running on Port: ${env.port}`)
  if (env.node_env === 'production') console.log('Server Started')
})

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.')
  logger.info('Closing http server.')
  server.close(err => {
    logger.info('Http server closed.')
    process.exit(err !== undefined ? 1 : 0)
  })
})
