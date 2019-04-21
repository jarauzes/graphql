const Query = {
    users(parent, args, { db, prisma }, info) {
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    Posts(parent, args, { db, prisma }, info) {
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }

        return prisma.query.posts(opArgs, info)
    },
    Comments(parent, args, { db, prisma }, info) {
        return prisma.query.comments(null, info)
    },
    Updates(parent, args, { db }, info) {
        return db.updates
    }
}

export { Query as default }