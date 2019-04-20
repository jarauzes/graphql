import { GraphQLServer } from 'graphql-yoga';

// Scalar Types(5): String, Boolean, Int, Float, ID  (!-important must have return, else null)
// Non Scalar Type(2): Object or Array (collection of discrete value)

// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        isStock: Boolean!
    }
`

// Resolvers 
const resolvers = {
    Query: {
        title() {
            return 'Graph QL Book'
        },
        price() {
            return 291.44
        },
        releaseYear() {
            return 2019
        },
        rating() {
            return 5.00
        },
        isStock() {
            return true
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