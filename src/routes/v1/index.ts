import express, { type Express } from 'express'
import authRoutes from './auth-routes'

const v1Routes: Express = express()

v1Routes.use('/auth', authRoutes)

export default v1Routes
