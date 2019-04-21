import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'prisma/src/gen/prisma.graphql',
    endpoint: 'http://localhost:4466'
})


const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if(!userExists) {
        throw new Error('user not found');
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts{ id title published } } }')
    return post.author
}

// createPostForUser('cjuppmh47010c07886gvu4xaa', {
//     title: 'Best book to read',
//     body: 'The Hilary Clinton Book of the United States of America',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// });


const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId })

    if(!postExists) {
        throw new Error('Post not found');
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id name email posts { id title published } } }')
    return post.author
}

updatePostForUser("cjuq3s36j05bt0788mnxghmoc", {
    title: 'Graph QL Prisma',
    body: 'Prisma replaces traditional ORMs',
    published: true
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
    console.log(error.message)
});