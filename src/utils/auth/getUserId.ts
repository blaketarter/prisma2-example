import { Context } from '../../context'
import {verifyToken} from "./token"

export const getUserId = (context: Context) => {
  const authorizationHeader = context.req.get('Authorization')

  if (authorizationHeader) {
    const verifiedToken = verifyToken(authorizationHeader)
    return verifiedToken.userId
  }

  throw new Error("Invalid token")
}