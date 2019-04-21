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
    Comments(parent, args, { db }, info) {
        if(!args.query) {
            return db.comments
        }

        return db.comments.filter((comment) => {
            return comment.text.toLowerCase().includes(args.query.toLowerCase())
        })

    },
    Updates(parent, args, { db }, info) {
        return db.updates
    }
}

export { Query as default }