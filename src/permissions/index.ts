import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils/auth/getUserId'
import { Context } from 'nexus-prisma/dist/utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context: Context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isPostOwner: rule()(async (parent, { id }, context: Context) => {
    const userId = getUserId(context)
    const author = await context.prisma.post
      .findOne({
        where: {
          id: Number(id),
        },
      })
      .author()
    return userId === author?.id
  }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    feed: rules.isAuthenticatedUser,
    filterPosts: rules.isAuthenticatedUser,
    post: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
  },
})