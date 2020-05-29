import path from "path"
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client"

dotenv.config({ path: path.join(__dirname, ".env") })

const prisma = new PrismaClient({
  errorFormat: "pretty"
})

async function main() {
  const allUsers = await prisma.user.findMany({
    first: 100,
    select: {
      id: true,
      name: true,
      email: true,
      posts: true,
      profile: true,
      password: true,
      isAdmin: true,
      createdAt: true,
      updatedAt: true,
    }
  })
  console.log(allUsers)

  const allProfiles = await prisma.profile.findMany({
    first: 100,
    select: {
      id: true,
      bio: true,
      user: true,
      userId: true,
      createdAt: true,
      updatedAt: true
    }
  })
  console.log(allProfiles)

  const allPosts = await prisma.post.findMany({
    first: 100,
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      author: true,
      authorId: true,
      createdAt: true,
      updatedAt: true
    }
  })
  console.log(allPosts)
}

main()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.disconnect()
  })