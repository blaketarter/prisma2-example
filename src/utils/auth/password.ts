import { compare, hash } from 'bcryptjs'


const isValidPassword = (password: string): boolean => {
  if (!password || password.length === 0) {
    throw new Error('Invalid password')
  }

  return true
}

export const hashPassword = async (password: string) => {
  if (isValidPassword(password)) {
    return await hash(password, 10)
  }

  throw new Error('Invalid password')
}

export const comparePassword = async (passwordA: string, passwordB: string) => {
  if (isValidPassword(passwordA) && isValidPassword(passwordB)) {
    const passwordsMatch = await compare(passwordA, passwordB)

    if (passwordsMatch) {
      return true
    }
  }

  throw new Error('Invalid password')
}