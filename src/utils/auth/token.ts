import { sign, verify, SignOptions } from 'jsonwebtoken'

export interface Token {
  userId: number
}

const jwtOptions: Partial<SignOptions> = {
  expiresIn: "1d"
}

const isValidToken = (token: Token): boolean => {
  if (!token || !token.userId || typeof token.userId !== "number" ) {
    throw new Error('Invalid token')
  }

  return true
}

export const signToken = (userId: Token["userId"]): string => {
  if (!process.env.APP_SECRET) {
    throw new Error('Missing Secret')
  }
  
  const token = { userId }

  if (isValidToken(token)) {
    return sign({ userId }, process.env.APP_SECRET, jwtOptions)
  }
  
  throw new Error('Invalid token')
};

export const verifyToken = (authorizationHeader: string): Token => {
  if (!process.env.APP_SECRET) {
    throw new Error('Missing Secret')
  }

  const token = authorizationHeader.replace('Bearer ', '')
  const verifiedToken = verify(token, process.env.APP_SECRET) as Token

  if (isValidToken(verifiedToken)) {
    return verifiedToken
  }
  
  throw new Error('Invalid token')
};