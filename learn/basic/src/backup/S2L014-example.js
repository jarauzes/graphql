import { GraphQLServer } from 'graphql-yoga';

// Scalar Types(5): String, Boolean, Int, Float, ID  (!-important must have return, else null)
// Non Scalar Type(2): Object or Array (collection of discrete value)

// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`;

// Resolvers 
const resolvers = {
    Query: {
        me() {
            return {
                id: 'J19F9DF9REODF',
                name: 'Joe',
                email: 'joe.ydoan.rauzes@example.com',
                age: 28
            }
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers 
});

server.start(() => {
    console.log('The server is up!')
});