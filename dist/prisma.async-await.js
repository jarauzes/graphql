'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _prismaBinding = require('prisma-binding');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var prisma = new _prismaBinding.Prisma({
    typeDefs: 'prisma/src/gen/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

var createPostForUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(authorId, data) {
        var userExists, post;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return prisma.exists.User({ id: authorId });

                    case 2:
                        userExists = _context.sent;

                        if (userExists) {
                            _context.next = 5;
                            break;
                        }

                        throw new Error('user not found');

                    case 5:
                        _context.next = 7;
                        return prisma.mutation.createPost({
                            data: _extends({}, data, {
                                author: {
                                    connect: {
                                        id: authorId
                                    }
                                }
                            })
                        }, '{ author { id name email posts{ id title published } } }');

                    case 7:
                        post = _context.sent;
                        return _context.abrupt('return', post.author);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createPostForUser(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

// createPostForUser('cjuppmh47010c07886gvu4xaa', {
//     title: 'Best book to read',
//     body: 'The Hilary Clinton Book of the United States of America',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// });


var updatePostForUser = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(postId, data) {
        var postExists, post;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return prisma.exists.Post({ id: postId });

                    case 2:
                        postExists = _context2.sent;

                        if (postExists) {
                            _context2.next = 5;
                            break;
                        }

                        throw new Error('Post not found');

                    case 5:
                        _context2.next = 7;
                        return prisma.mutation.updatePost({
                            where: {
                                id: postId
                            },
                            data: data
                        }, '{ author { id name email posts { id title published } } }');

                    case 7:
                        post = _context2.sent;
                        return _context2.abrupt('return', post.author);

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function updatePostForUser(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

updatePostForUser("cjuq3s36j05bt0788mnxghmoc", {
    title: 'Graph QL Prisma',
    body: 'Prisma replaces traditional ORMs',
    published: true
}).then(function (user) {
    console.log(JSON.stringify(user, undefined, 2));
}).catch(function (error) {
    console.log(error.message);
});