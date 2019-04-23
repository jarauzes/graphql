'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
    createUser: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, _ref2, info) {
            var data = _ref.data;
            var prisma = _ref2.prisma;
            var password, user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(data.password.length < 8)) {
                                _context.next = 2;
                                break;
                            }

                            throw new Error("Password must be 8 characters or longer");

                        case 2:
                            _context.next = 4;
                            return _bcryptjs2.default.hash(data.password, 10);

                        case 4:
                            password = _context.sent;
                            _context.next = 7;
                            return prisma.mutation.createUser({
                                data: _extends({}, data, {
                                    password: password
                                })
                            });

                        case 7:
                            user = _context.sent;
                            return _context.abrupt('return', {
                                user: user,
                                token: _jsonwebtoken2.default.sign({ userId: user.id }, 'token')
                            });

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function createUser(_x, _x2, _x3, _x4) {
            return _ref3.apply(this, arguments);
        }

        return createUser;
    }(),
    login: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref4, _ref5, info) {
            var data = _ref4.data;
            var prisma = _ref5.prisma;
            var user, isMatch;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return prisma.query.user({
                                where: {
                                    email: data.email
                                }
                            });

                        case 2:
                            user = _context2.sent;

                            if (user) {
                                _context2.next = 5;
                                break;
                            }

                            throw new Error('Unable to login');

                        case 5:
                            _context2.next = 7;
                            return _bcryptjs2.default.compare(data.password, user.password);

                        case 7:
                            isMatch = _context2.sent;

                            if (isMatch) {
                                _context2.next = 10;
                                break;
                            }

                            throw new Error('Unable to login');

                        case 10:
                            return _context2.abrupt('return', {
                                user: user,
                                token: _jsonwebtoken2.default.sign({ userId: user.id }, 'token')
                            });

                        case 11:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function login(_x5, _x6, _x7, _x8) {
            return _ref6.apply(this, arguments);
        }

        return login;
    }(),
    deleteUser: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref7, info) {
            var prisma = _ref7.prisma,
                request = _ref7.request;
            var userId;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            _context3.next = 3;
                            return prisma.mutation.deleteUser({
                                where: {
                                    id: userId
                                }
                            }, info);

                        case 3:
                            return _context3.abrupt('return', _context3.sent);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function deleteUser(_x9, _x10, _x11, _x12) {
            return _ref8.apply(this, arguments);
        }

        return deleteUser;
    }(),
    updateUser: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref9, info) {
            var prisma = _ref9.prisma,
                request = _ref9.request;
            var userId;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            // args or {id, data} is the same
                            userId = (0, _getUserId2.default)(request);
                            _context4.next = 3;
                            return prisma.mutation.updateUser({
                                where: {
                                    id: userId
                                },
                                data: args.data
                            }, info);

                        case 3:
                            return _context4.abrupt('return', _context4.sent);

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function updateUser(_x13, _x14, _x15, _x16) {
            return _ref10.apply(this, arguments);
        }

        return updateUser;
    }(),
    createPost: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args, _ref11, info) {
            var prisma = _ref11.prisma,
                request = _ref11.request;
            var userId;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            _context5.next = 3;
                            return prisma.mutation.createPost({
                                data: {
                                    title: args.data.title,
                                    body: args.data.body,
                                    published: args.data.published,
                                    author: {
                                        connect: {
                                            id: userId
                                        }
                                    }
                                }
                            }, info);

                        case 3:
                            return _context5.abrupt('return', _context5.sent);

                        case 4:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function createPost(_x17, _x18, _x19, _x20) {
            return _ref12.apply(this, arguments);
        }

        return createPost;
    }(),
    deletePost: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, args, _ref13, info) {
            var prisma = _ref13.prisma,
                request = _ref13.request;
            var userId, postExists;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            userId = (0, _getUserId2.default)(request);
                            _context6.next = 3;
                            return prisma.exists.Post({
                                id: args.id,
                                author: {
                                    id: userId
                                }
                            });

                        case 3:
                            postExists = _context6.sent;

                            if (postExists) {
                                _context6.next = 6;
                                break;
                            }

                            throw new Error('Unable to find the post');

                        case 6:
                            _context6.next = 8;
                            return prisma.mutation.deletePost({
                                where: {
                                    id: args.id
                                }
                            }, info);

                        case 8:
                            return _context6.abrupt('return', _context6.sent);

                        case 9:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function deletePost(_x21, _x22, _x23, _x24) {
            return _ref14.apply(this, arguments);
        }

        return deletePost;
    }(),
    updatePost: function () {
        var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, _ref15, _ref16, info) {
            var id = _ref15.id,
                data = _ref15.data;
            var prisma = _ref16.prisma;
            var postExists, isPublished;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return prisma.exists.Post({
                                id: id,
                                author: {
                                    id: userId
                                }
                            });

                        case 2:
                            postExists = _context7.sent;
                            _context7.next = 5;
                            return prisma.exists.Post({ id: id, published: true });

                        case 5:
                            isPublished = _context7.sent;

                            if (!(!isPublished && args.data.published === false)) {
                                _context7.next = 9;
                                break;
                            }

                            _context7.next = 9;
                            return prisma.mutation.deleteManyComments({
                                where: {
                                    post: {
                                        id: id
                                    }
                                }
                            });

                        case 9:
                            _context7.next = 11;
                            return prisma.mutation.updatePost({
                                where: {
                                    id: id
                                },
                                data: data
                            }, info);

                        case 11:
                            return _context7.abrupt('return', _context7.sent);

                        case 12:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function updatePost(_x25, _x26, _x27, _x28) {
            return _ref17.apply(this, arguments);
        }

        return updatePost;
    }(),
    createComment: function () {
        var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, _ref18, _ref19, info) {
            var data = _ref18.data;
            var prisma = _ref19.prisma;
            var published;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return prisma.exists.Post({
                                id: data.post,
                                published: true
                            });

                        case 2:
                            published = _context8.sent;

                            if (published) {
                                _context8.next = 5;
                                break;
                            }

                            throw new Error('Unable to find post');

                        case 5:
                            return _context8.abrupt('return', prisma.mutation.createComment({
                                data: {
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
                            }, info));

                        case 6:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function createComment(_x29, _x30, _x31, _x32) {
            return _ref20.apply(this, arguments);
        }

        return createComment;
    }(),
    deleteComment: function () {
        var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, _ref21, _ref22, info) {
            var id = _ref21.id;
            var prisma = _ref22.prisma;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return prisma.mutation.deleteComment({
                                where: {
                                    id: id
                                }
                            }, info);

                        case 2:
                            return _context9.abrupt('return', _context9.sent);

                        case 3:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function deleteComment(_x33, _x34, _x35, _x36) {
            return _ref23.apply(this, arguments);
        }

        return deleteComment;
    }(),
    updateComment: function () {
        var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(parent, _ref24, _ref25, info) {
            var id = _ref24.id,
                data = _ref24.data;
            var prisma = _ref25.prisma;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return prisma.mutation.updateComment({
                                where: {
                                    id: id
                                },
                                data: data
                            }, info);

                        case 2:
                            return _context10.abrupt('return', _context10.sent);

                        case 3:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        function updateComment(_x37, _x38, _x39, _x40) {
            return _ref26.apply(this, arguments);
        }

        return updateComment;
    }()
};

exports.default = Mutation;