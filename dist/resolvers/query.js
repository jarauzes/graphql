'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
    users: function users(parent, args, _ref, info) {
        var db = _ref.db,
            prisma = _ref.prisma;

        var opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        };

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            };
        }

        return prisma.query.users(opArgs, info);
    },
    Posts: function Posts(parent, args, _ref2, info) {
        var request = _ref2.request,
            prisma = _ref2.prisma;

        var userId = (0, _getUserId2.default)(request);

        var opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            where: {
                published: true
            }
        };

        if (args.query) {
            opArgs.where.OR = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            };
        }

        return prisma.query.posts(opArgs, info);
    },
    myPosts: function myPosts(parent, _ref3, _ref4, info) {
        var query = _ref3.query;
        var request = _ref4.request,
            prisma = _ref4.prisma;

        var userId = (0, _getUserId2.default)(request);

        var opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        };

        if (query) {
            opArgs.where.OR = [{
                title_contains: query
            }, {
                body_contains: query
            }];
        }

        return prisma.query.posts(opArgs, info);
    },
    me: function me(parent, args, _ref5, info) {
        var prisma = _ref5.prisma,
            request = _ref5.request;

        var userId = (0, _getUserId2.default)(request);

        return prisma.query.user({
            where: {
                id: userId
            }
        });
    },
    post: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref6, _ref7, info) {
            var id = _ref6.id;
            var prisma = _ref7.prisma,
                request = _ref7.request;
            var userId, posts;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request, false);
                            _context.next = 3;
                            return prisma.query.posts({
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
                            }, info);

                        case 3:
                            posts = _context.sent;

                            if (!(posts.length === 0)) {
                                _context.next = 6;
                                break;
                            }

                            throw new Error('Post not found');

                        case 6:
                            return _context.abrupt('return', posts[0]);

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function post(_x, _x2, _x3, _x4) {
            return _ref8.apply(this, arguments);
        }

        return post;
    }(),
    Comments: function Comments(parent, args, _ref9, info) {
        var db = _ref9.db,
            prisma = _ref9.prisma;

        return prisma.query.comments(null, info);
    },
    Updates: function Updates(parent, args, _ref10, info) {
        var db = _ref10.db;

        return db.updates;
    }
};

exports.default = Query;