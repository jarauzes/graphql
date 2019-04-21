import uuidv4 from 'uuid/v4'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        return await prisma.mutation.createUser({ data: args.data }, info)
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