import { type TypeOf, z } from 'zod'

export const signUpSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Username name is required',
      })
      .min(1, 'Username is required'),
    fullname: z
      .string({
        required_error: 'Full name is required',
      })
      .min(1, 'Full name is required'),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password too short - should be 6 chars minimum'),
  }),
})

export const signInSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    username: z.string({
      required_error: 'Username / Email is required',
    }),
  }),
})

export type SignUpInput = TypeOf<typeof signUpSchema>
export type SignInInput = TypeOf<typeof signInSchema>
