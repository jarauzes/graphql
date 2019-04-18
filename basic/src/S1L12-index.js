import { GraphQLServer } from 'graphql-yoga';

// Scalar Types(5): String, Boolean, Int, Float, ID  (!-important)
// Non Scalar Type(2): Object or Array (collection of discrete value)

// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        about: String!
    }
`

// Resolvers 
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Joe Ydoan Rauzes'
        },
        location() {
            return 'Düsseldorf, Germany'
        },
        about() {
            return 'Classic Frontend Devs => Modern Backend Devs'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers 
});

server.start(() => {
    console.log('The server is up!')
})