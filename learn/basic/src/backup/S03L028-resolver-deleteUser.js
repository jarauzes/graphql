import uuidv4 from 'uuid/v4'

let users = [{
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

let posts = [{
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

let comments = [{
    id: 'C19F9DF9REODF1',
    text: 'The fox can fly, they jump higher',
    author: 'U19HIHIA3B8I1',
    post: 'P19F9DF9REODF1'
}, {
    id: 'C19F9DF9REODF2',
    text: 'In my African travels, I have heard the following one of elephant and another of Gorillas.',
    author: 'U19HIHIA3B8I2',
    post: 'P19F9DF9REODF2'
}, {
    id: 'C19F9DF9REODF3',
    text: 'Two wanted to traverse Kariba Lake south to north. In the first attempt the rangers managed to return them to Zimbabwe.',
    author: 'U19HIHIA3B8I3',
    post: 'P19F9DF9REODF2'
}, {
    id: 'C19F9DF9REODF4',
    text: 'However they persisted and in this case the rangers followed. The elephants exited on the Zambia side close to a path that was flooded when Kariba was formed.',
    author: 'U19HIHIA3B8I4',
    post: 'P19F9DF9REODF1'
}, {
    id: 'C19F9DF9REODF5',
    text: 'Gorilla: One approached a lady wiping his finger on her lipstick.',
    author: 'U19HIHIA3B8I1',
    post: 'P19F9DF9REODF4'
}, {
    id: 'C19F9DF9REODF6',
    text: 'The gorilla then went into some protective mode of the lady.',
    author: 'U19HIHIA3B8I2',
    post: 'P19F9DF9REODF3'
}, {
    id: 'C19F9DF9REODF7',
    text: 'These would need to be verified, but in any case suggest that both animals certainly have some human attributes.',
    author: 'U19HIHIA3B8I3',
    post: 'P19F9DF9REODF4'
}, {
    id: 'C19F9DF9REODF8',
    text: 'Humans ARE a species of animal. You should get your vocabulary straightened out.',
    author: 'U19HIHIA3B8I4',
    post: 'P19F9DF9REODF3'
}]

let updates = [{
    id: 'R19F9DF9REODF1',
    text: 'User Management System - Security update.'
}, {
    id: 'R19F9DF9REODF2',
    text: 'Socket Management System - Security update.'
}, {
    id: 'R19F9DF9REODF3',
    text: 'Connection Architecture Update.'
}, {
    id: 'R19F9DF9REODF4',
    text: 'SOAP First Release'
}]

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
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.data.email)

            if(emailTaken) {
                throw new Error('Email taken.')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)

            return user
        
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex((user) => user.id === args.id)

            if(userIndex == -1) {
                throw new Error('User does not Exist')
            }

            const deleteUsers = users.splice(userIndex, 1)

            posts = posts.filter((post) => {
                const match = post.author === args.id

                if(match) {
                    comments = comments.filter((comment) => comment.post !== post.id)
                }

                return !match
            })

            comments = comments.filter((comment) => comment.author !== args.id);

            return deleteUsers[0]
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)

            if(!userExists) {
                throw new Error('User not found!')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)

            return post

        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            const postExists = posts.some((post) => post.id === args.data.post && post.published)

            if(!userExists || !postExists) {
                throw new Error('Author or Post not found!')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)

            return comment

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

export { resolvers }