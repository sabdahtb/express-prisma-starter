import bcrypt from 'bcrypt'
import { type Request, type Response } from 'express'

import env from '../config/env'
import { getError } from '../utils/error'
import { authService } from '../service/auth-service'
import { type SignInInput, type SignUpInput } from '../schema/auth-schema'

export const authController = {
  signUp: async (req: Request<{}, {}, SignUpInput['body']>, res: Response) => {
    try {
      const { email, username, password, fullname } = req.body
      const salt = await bcrypt.genSalt(env.salt_factor)

      const hash = bcrypt.hashSync(password, salt)
      const user = await authService.createUser({
        hash,
        email,
        username,
        fullname,
      })

      res.status(201).json(user)
    } catch (error) {
      res.status(400).json(getError(error))
    }
  },
  signIn: async (req: Request<{}, {}, SignInInput['body']>, res: Response) => {
    try {
      const { username, password } = req.body

      const user = await authService.getOneUser(username)
      if (user === null || user === undefined)
        throw new Error('Invalid username or password')

      const valid = await bcrypt.compare(String(password), String(user.hash))
      if (!valid) throw new Error('Invalid username or password')

      res.status(201).json(user)
    } catch (error) {
      res.status(400).json(getError(error))
    }
  },
}
