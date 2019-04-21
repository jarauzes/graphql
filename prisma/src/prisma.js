import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'prisma/src/gen/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'mypass22mypassMP'
})

export { prisma as default }