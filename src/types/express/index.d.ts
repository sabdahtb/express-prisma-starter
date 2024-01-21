import express from 'express'

type UserRequest = {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: UserRequest
    }
  }
}
