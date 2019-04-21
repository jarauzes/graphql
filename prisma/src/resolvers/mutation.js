import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Mutation = {
    async createUser(parent, {data}, { prisma }, info) {
        if(data.password.length < 8) {
            throw new Error("Password must be 8 characters or longer")
        }

        const password = await bcrypt.hash(data.password, 10)
        const user = await prisma.mutation.createUser({
             data: {
                 ...data,
                 password
            }
        })

        return {
            user,
            token: jwt.sign({userId: user.id}, 'token')
        }
    },

    async deleteUser(parent, args, { prisma }, info) {
        return await prisma.mutation.deleteUser({
            where: {
                id:args.id
            }
        }, info)
    },

    async updateUser(parent, args, { prisma }, info) {  // args or {id, data} is the same
        return await prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },

    async createPost(parent, args, { prisma }, info) {
        return await prisma.mutation.createPost({ 
            data:{
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            } 
        }, info)
    },

    async deletePost(parent, args, { prisma }, info) {
        return await prisma.mutation.deletePost({
            where: {
                id:args.id
            }
        }, info)
    },

    async updatePost(parent, {id, data}, {prisma} ,info) { 
        return await prisma.mutation.updatePost({
            where: {
                id: id
            },
            data: data
        }, info)
    },

    async createComment(parent, {data}, {prisma}, info) {
        return await prisma.mutation.createComment({ 
            data:{
                text: data.text,
                post: {
                    connect: {
                        id: data.post
                    }
                },
                author: {
                    connect: {
                        id: data.author
                    }
                }
            } 
        }, info)
    },

    async deleteComment(parent, {id}, {prisma}, info) {
        return await prisma.mutation.deleteComment({
            where: {
                id: id
            }
        }, info)
    },

    async updateComment(parent, {id, data}, {prisma}, info) { 
        return await prisma.mutation.updateComment({
            where: {
                id: id
            },
            data: data
        }, info)
    },
}

export { Mutation as default }