import { GraphQLServer } from 'graphql-yoga';

import { typeDefs } from './definitions'

import { users } from './data/user.data';
import { posts } from './data/post.data';
import { comments } from './data/comment.data';
import { updates } from './data/update.data';


// Scalar Types(5): String, Boolean, Int, Float, ID  (!-important must have return, else null)
// Non Scalar Type(2): Object or Array (collection of discrete value)
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

        },
        Comments(parent, args, ctx, info) {
            if(!args.query) {
                return comments
            }

            return comments.filter((comment) => {
                return comment.text.toLowerCase().includes(args.query.toLowerCase())
            })

        },
        Updates(parent, args, ctx, info) {
            return updates
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers 
});

server.start(() => {
    console.log('The server is up!')
});