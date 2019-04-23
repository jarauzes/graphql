'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fragmentReplacements = exports.resolvers = undefined;

var _prismaBinding = require('prisma-binding');

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _mutation = require('./mutation');

var _mutation2 = _interopRequireDefault(_mutation);

var _subscription = require('./subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = {
    Query: _query2.default,
    Mutation: _mutation2.default,
    Subscription: _subscription2.default,
    User: _user2.default,
    Post: _post2.default,
    Comment: _comment2.default
};

var fragmentReplacements = (0, _prismaBinding.extractFragmentReplacements)(resolvers);

exports.resolvers = resolvers;
exports.fragmentReplacements = fragmentReplacements;