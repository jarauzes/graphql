import { GraphQLServer } from 'graphql-yoga';

// Scalar Types(5): String, Boolean, Int, Float, ID  (!-important must have return, else null)
// Non Scalar Type(2): Object or Array (collection of discrete value)

// Demo user Data
const users = [{
    id: 'U19HIHIA3B8I1',
    name: 'Joey',
    email: 'joe.ydoan.rauzes@example.com',
    age: '27'
}, {
    id: 'U19HIHIA3B8I2',
    name: 'Dave',
    email: 'dave.ydoan.rauzes@example.com'
}, {
    id: 'U19HIHIA3B8I3',
    name: 'John',
    email: 'john.ydoan.rauzes@example.com',
    age: '16'
}, {
    id: 'U19HIHIA3B8I4',
    name: 'Mike',
    email: 'mike.ydoan.rauzes@example.com'
}]

// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
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
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })

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