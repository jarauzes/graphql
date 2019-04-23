'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _prismaBinding = require('prisma-binding');

var _index = require('./resolvers/index');

var prisma = new _prismaBinding.Prisma({
    typeDefs: 'prisma/src/gen/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'mypass22mypassMP',
    fragmentReplacements: _index.fragmentReplacements
});

exports.default = prisma;