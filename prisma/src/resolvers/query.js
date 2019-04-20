const Query = {
    users(parent, args, { db }, info) {
        if(!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })

    },
    me() {
        return {
            id: 'U19F9DF9REODF',
            name: 'Joe',
            email: 'joe.ydoan.rauzes@example.com',
            age: 28
        }
    },
    Posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })

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