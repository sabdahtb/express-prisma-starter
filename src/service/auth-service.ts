import jwt from 'jsonwebtoken'

import env from '../config/env'
import prisma from '../config/db'
import { throwError } from '../utils/error'
import { type IToken, type IUser } from '../types/auth'

export const authService = {
  createUser: async (data: IUser) => {
    try {
      const newUser = await prisma.user.create({
        data,
      })

      return newUser
    } catch (error) {
      throwError(error, 'Error creating user')
    }
  },
  getOneUser: async function (username: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email: username,
            },
          ],
        },
      })

      return user
    } catch (error) {
      throwError(error, 'User not found')
    }
  },
  refreshToken: async function (refreshToken: string) {
    try {
      const decoded = jwt.decode(refreshToken)

      if (decoded == null || typeof decoded === 'string') throw new Error()
      const expTime = decoded?.exp ?? 0
      const isExp = Math.floor(Date.now() / 1000) > expTime

      if (isExp) throw new Error()
      return await this.getToken(decoded?.sub ?? '', String(decoded?.email))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      throw new Error('Error get refresh token')
    }
  },
  getToken: async function (id: string, email: string): Promise<IToken> {
    const payload = {
      email,
      sub: id,
      exp: Math.floor(Date.now() / 1000) + 6 * 24 * 60 * 60,
    }
    const refreshPayload = {
      email,
      sub: id,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    }

    const accessToken = jwt.sign(payload, env.jwt_secret)
    const refreshToken = jwt.sign(refreshPayload, env.jwt_secret)

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  },
}
