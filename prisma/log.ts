import path from "path"
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client"

dotenv.config({ path: path.join(__dirname, ".env") })

const prisma = new PrismaClient({
  errorFormat: "pretty"
})

async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.disconnect()
  })