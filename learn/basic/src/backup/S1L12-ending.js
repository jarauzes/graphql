import { GraphQLServer } from 'graphql-yoga';

// Scalar Types(5): String, Boolean, Int, Float, ID  (!-important must have return, else null)
// Non Scalar Type(2): Object or Array (collection of discrete value)

// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`

// Resolvers 
const resolvers = {
    Query: {
        id() {
            return '1ABC2343'
        },
        name() {
            return 'Joe Ydoan Rauzes'
        },
        age() {
            return 40
        },
        employed() {
            return true
        },
        gpa() {
            return null
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