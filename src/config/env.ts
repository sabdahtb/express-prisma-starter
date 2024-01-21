import dotenv from 'dotenv'

dotenv.config()

const env = {
  port: process.env.PORT ?? 8000,
  node_env: process.env.NODE_ENV ?? 'development',
  salt_factor: process.env.SALT_FACTOR ?? 10,
  jwt_secret: process.env.JWT_SECRET ?? 'TEST_SECRET',
}

export default env
