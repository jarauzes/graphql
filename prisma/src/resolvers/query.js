import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, { db, prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        }

        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    Posts(parent, args, {request, prisma}, info) {
        const userId = getUserId(request)
        
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            where: {
                published: true
            }
        }

        if(args.query) {
            opArgs.where.OR = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }

        return prisma.query.posts(opArgs, info)
    },
    myPosts(parent, {query}, {request, prisma}, info) {
        const userId = getUserId(request)

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            where: {
                author: {
                    id: userId
                }
            }
        }

        if(query) {
            opArgs.where.OR = [{
                title_contains: query
            }, {
                body_contains: query
            }]
        }

        return prisma.query.posts(opArgs, info)
    },
    me(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        })
    },
    async post(parent, {id}, {prisma, request}, info) {
        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({
            where: {
                id: id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if(posts.length === 0) {
            throw new Error('Post not found')
        }

        return posts[0]
    },
    Comments(parent, args, { db, prisma }, info) {
        return prisma.query.comments(null, info)
    },
    Updates(parent, args, { db }, info) {
        return db.updates
    }
}

export { Query as default }