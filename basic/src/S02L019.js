import { GraphQLServer } from 'graphql-yoga';
import { Http2SecureServer } from 'http2';

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

const posts = [{
    id: 'P19F9DF9REODF1',
    title: 'Fox story',
    body: 'The quick brown fox, jumps over the lazy dog',
    published: false,
    author: 'U19HIHIA3B8I2'
}, {
    id: 'P19F9DF9REODF2',
    title: 'Chicken story',
    body: 'The quick white chicken, fly over the lazy dog',
    published: true,
    author: 'U19HIHIA3B8I2'
}, {
    id: 'P19F9DF9REODF3',
    title: 'Turtle story',
    body: 'The slow wet turtle, walk under the lazy dog',
    published: true,
    author: 'U19HIHIA3B8I2'
}, {
    id: 'P19F9DF9REODF4',
    title: 'Ant story',
    body: 'The small hungry ant, walk over the the lazy dog fel',
    published: true,
    author: 'U19HIHIA3B8I4'
}]

// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        Posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User! 
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
        Posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })

        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
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