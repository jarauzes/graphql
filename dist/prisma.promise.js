'use strict';

var _prismaBinding = require('prisma-binding');

var prisma = new _prismaBinding.Prisma({
    typeDefs: 'prisma/src/gen/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

// callbacks, promises, async/await
// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//    console.log(JSON.stringify(data, undefined, 2))
// })

//prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//    console.log(JSON.stringify(data, undefined, 2))
//})

prisma.mutation.createPost({
    data: {
        title: "1 Node js info",
        body: "Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.",
        published: false,
        author: {
            connect: {
                id: "cjupzwrws03bz0788u9nljpdj"
            }
        }
    }
}, '{ id title body published author { name } }').then(function (data) {
    console.log(data);
    return prisma.query.users(null, '{ id name posts { id title } }');
}).then(function (data) {
    console.log(JSON.stringify(data, undefined, 2));
});

prisma.mutation.updatePost({
    where: {
        id: "cjuq4867f05g70788o8z8nx75"
    },
    data: {
        title: "101 Node js info",
        body: "101 Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.",
        published: true
    }
}, '{ id }').then(function (data) {
    return prisma.query.posts(null, '{ id title body published }');
}).then(function (data) {
    console.log(data);
});