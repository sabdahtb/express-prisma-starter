import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export function getError(e: unknown): { message: string } {
  if (typeof e === 'string') {
    return { message: e }
  } else if (e instanceof ZodError) {
    return { message: e.issues[0].message }
  } else if (e instanceof Error) {
    return { message: e.message }
  } else {
    return { message: 'Something went wrong' }
  }
}

export function throwError(e: unknown, msg: string) {
  if (e instanceof ZodError) {
    throw new Error(e.issues[0].message)
  } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
    throw new Error(handlePrismaError(e))
  } else {
    throw new Error(msg)
  }
}

function handlePrismaError(err: Prisma.PrismaClientKnownRequestError): string {
  switch (err.code) {
    case 'P2002':
      return `Duplicate field value: ${String(err?.meta?.target)}`
    case 'P2014':
      return `Invalid ID: ${String(err?.meta?.target)}`
    case 'P2003':
      return `Invalid input data: ${String(err?.meta?.target)}`
    default:
      return `Something went wrong: ${err.message}`
  }
}
