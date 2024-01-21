import { type AnyZodObject } from 'zod'
import { type Request, type Response, type NextFunction } from 'express'

import { getError } from '../utils/error'

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      return res.status(400).json(getError(error))
    }
  }
