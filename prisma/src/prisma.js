import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
    typeDefs: 'prisma/src/gen/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'mypass22mypassMP',
    fragmentReplacements
})

export { prisma as default }