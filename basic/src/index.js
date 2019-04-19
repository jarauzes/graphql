import { GraphQLServer } from 'graphql-yoga'

import { typeDefs } from './definitions'
import { resolvers } from './resolver'

const server = new GraphQLServer({
    typeDefs,
    resolvers 
})

server.start(() => {
    console.log('The server is up!')
})