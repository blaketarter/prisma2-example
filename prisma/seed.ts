import { PrismaClient } from "@prisma/client"
import { hashPassword } from '../src/utils/auth/password'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hashPassword("ExampleP@ssw0rd1")

  await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      isAdmin: true,
      password: hashedPassword,
      profile: {
        create: {
          bio: "I am a test user."
        }
      },
      posts: {
        create: [
          {
            title: "My first post"
          },
          {
            title: "My second post"
          }
        ]
      }
    }
  })

  const allUsers = await prisma.user.findMany({
    include: { 
      posts: true,
      profile: true 
    },
  })

  console.dir(allUsers, { depth: null })

  if (allUsers) {
    await allUsers.reduce(async (promise, user) => {
      await promise

      await user.posts.reduce(async (promise, post) => {
        await promise

        const updatedPost = await prisma.post.update({
          where: { id: post.id },
          data: { published: true },
        })

        console.log(updatedPost)
      }, Promise.resolve())
    }, Promise.resolve())
  }

  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })

  const allUsers2 = await prisma.user.findMany({
    include: { 
      posts: true,
      profile: true 
    },
  })

  console.dir(allUsers2, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })