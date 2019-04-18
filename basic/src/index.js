import { GraphQLServer } from 'graphql-yoga';

// Scalar Types(5): String, Boolean, Int, Float, ID  (!-important must have return, else null)
// Non Scalar Type(2): Object or Array (collection of discrete value)

// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        add(a: Float!, b: Float!):Float!
        greeting(name: String, position: String): String! 
        me: User!
        Posts: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers 
// greeting(parent, args, ctx, ) parent, args = arguments, ctx = context, info = information
const resolvers = {
    Query: {

        add(parent, args, ctx, info) {
            return args.a + args.b
        },

        greeting(parent, args, ctx, info) {
            if(args.name && args.position) {
                return `Hello, ${args.name}! you are my favorite ${args.position}`
            } else {
                return 'Hello!'
            }
        },

        me() {
            return {
                id: 'U19F9DF9REODF',
                name: 'Joe',
                email: 'joe.ydoan.rauzes@example.com',
                age: 28
            }
        },
        Posts() {
            return {
                id: 'P19F9DF9REODF',
                title: 'The fox',
                body: '',
                published: false
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