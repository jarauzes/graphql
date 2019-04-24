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

const seedDatabase = async () => {
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })

    userOne.jwt = jwt.sign({ userId: userOne.user.id }, 'token')

    await prisma.mutation.createPost({
        data: {
            title: 'Publish this Post',
            body: 'this is the body of the published post',
            published: true,
            author: {
                connect: {
                    id: userOne.user.id
                } 
            }
        }
    })
    await prisma.mutation.createPost({
        data: {
            title: 'unPublish this Post',
            body: 'this is the body of the unPublished post',
            published: false,
            author: {
                connect: {
                    id: userOne.user.id
                } 
            }
        }
    })
}

export { seedDatabase as default, userOne }