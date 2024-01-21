import express, { type Express } from 'express'

import prisma from '../../config/db'
import { authController } from '../../controller/auth-controller'
import { signInSchema, signUpSchema } from '../../schema/auth-schema'
import { validate } from '../../middleware/validate'

const authRoutes: Express = express()

authRoutes.get('/health', async (_req, res) => {
  const users = await prisma.user.findMany()

  res.json(users)
})

authRoutes.post('/sign-up', validate(signUpSchema), authController.signUp)
authRoutes.post('/sign-in', validate(signInSchema), authController.signIn)

export default authRoutes
