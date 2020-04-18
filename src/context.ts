import { PrismaClient } from '@prisma/client'
import { ContextFunction } from "apollo-server-core"
import express from "express"

const prisma = new PrismaClient()

export interface Context {
  req: express.Request;
  res: express.Response;
  prisma: PrismaClient
}


export const createContext: ContextFunction<any, Context> = (context): Context => {
  return { ...context, prisma }
}
