import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'prisma/src/gen/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ id }')
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, '{ id name email posts { id title published } }')
    return user
}

// createPostForUser('cjuppmh47010c07886gvu4xaa', {
//     title: 'Best book to read',
//     body: 'The Hilary Clinton Book of the United States of America',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// });

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id } }')
    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{ id name email posts { id title published } }')
    return user
}

updatePostForUser("cjuq3v3vd05el0788ln5wtduo", {
    title: 'Graph QL Prisma',
    body: 'Prisma replaces traditional ORMs',
    published: true
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
});