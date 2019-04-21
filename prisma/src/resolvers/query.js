const Query = {
    users(parent, args, { db, prisma }, info) {

        return prisma.query.users(null, info)

        // if(!args.query) {
        //     return db.users
        // }

        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })

    },
    Posts(parent, args, { db, prisma }, info) {

        return prisma.query.posts(null, info)

        // if(!args.query) {
        //     return db.posts
        // }

        // return db.posts.filter((post) => {
        //     const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        //     const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        //     return isTitleMatch || isBodyMatch
        // })

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