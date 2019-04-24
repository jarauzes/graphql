import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../../prisma/src/prisma'

const userOne = {
    input: {
        name: 'Jast Rauzes',
        email: 'jast.ydoan.rauzes@test.com',
        password: bcrypt.hashSync('jast12345')
    },
    user: undefined,
    jwt: undefined
}

const postOne = {
    input: {
        title: 'Publish this Post',
        body: 'this is the body of the published post',
        published: true,
    },
    post: undefined
}

const postTwo = {
    input: {
        title: 'My draft post',
        body: '',
        published: false
    },
    post: undefined
}

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    
    // Create user one  
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, 'token')

    // Create post one
    postOne.post = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect: {
                    id: userOne.user.id
                } 
            }
        }
    })

     // Create post two
    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })
}

export { seedDatabase as default, userOne, postOne, postTwo }