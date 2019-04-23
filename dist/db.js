'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var users = [{
    id: 'U19HIHIA3B8I1',
    name: 'Joey',
    email: 'joe.ydoan.rauzes@example.com',
    age: '27'
}, {
    id: 'U19HIHIA3B8I2',
    name: 'Dave',
    email: 'dave.ydoan.rauzes@example.com'
}, {
    id: 'U19HIHIA3B8I3',
    name: 'John',
    email: 'john.ydoan.rauzes@example.com',
    age: '16'
}, {
    id: 'U19HIHIA3B8I4',
    name: 'Mike',
    email: 'mike.ydoan.rauzes@example.com'
}];

var posts = [{
    id: 'P19F9DF9REODF1',
    title: 'Fox story',
    body: 'The quick brown fox, jumps over the lazy dog',
    published: false,
    author: 'U19HIHIA3B8I2'
}, {
    id: 'P19F9DF9REODF2',
    title: 'Chicken story',
    body: 'The quick white chicken, fly over the lazy dog',
    published: true,
    author: 'U19HIHIA3B8I2'
}, {
    id: 'P19F9DF9REODF3',
    title: 'Turtle story',
    body: 'The slow wet turtle, walk under the lazy dog',
    published: true,
    author: 'U19HIHIA3B8I2'
}, {
    id: 'P19F9DF9REODF4',
    title: 'Ant story',
    body: 'The small hungry ant, walk over the the lazy dog fel',
    published: false,
    author: 'U19HIHIA3B8I4'
}, {
    id: 'P19F9DF9REODF5',
    title: 'Butterfly',
    body: 'The small butterfly, wfly over the nice flower',
    published: true,
    author: 'U19HIHIA3B8I1'
}];

var comments = [{
    id: 'C19F9DF9REODF1',
    text: 'The fox can fly, they jump higher',
    author: 'U19HIHIA3B8I1',
    post: 'P19F9DF9REODF1'
}, {
    id: 'C19F9DF9REODF2',
    text: 'In my African travels, I have heard the following one of elephant and another of Gorillas.',
    author: 'U19HIHIA3B8I2',
    post: 'P19F9DF9REODF2'
}, {
    id: 'C19F9DF9REODF3',
    text: 'Two wanted to traverse Kariba Lake south to north. In the first attempt the rangers managed to return them to Zimbabwe.',
    author: 'U19HIHIA3B8I3',
    post: 'P19F9DF9REODF2'
}, {
    id: 'C19F9DF9REODF4',
    text: 'However they persisted and in this case the rangers followed. The elephants exited on the Zambia side close to a path that was flooded when Kariba was formed.',
    author: 'U19HIHIA3B8I4',
    post: 'P19F9DF9REODF1'
}, {
    id: 'C19F9DF9REODF5',
    text: 'Gorilla: One approached a lady wiping his finger on her lipstick.',
    author: 'U19HIHIA3B8I1',
    post: 'P19F9DF9REODF4'
}, {
    id: 'C19F9DF9REODF6',
    text: 'The gorilla then went into some protective mode of the lady.',
    author: 'U19HIHIA3B8I2',
    post: 'P19F9DF9REODF3'
}, {
    id: 'C19F9DF9REODF7',
    text: 'These would need to be verified, but in any case suggest that both animals certainly have some human attributes.',
    author: 'U19HIHIA3B8I3',
    post: 'P19F9DF9REODF4'
}, {
    id: 'C19F9DF9REODF8',
    text: 'Humans ARE a species of animal. You should get your vocabulary straightened out.',
    author: 'U19HIHIA3B8I4',
    post: 'P19F9DF9REODF3'
}];

var updates = [{
    id: 'R19F9DF9REODF1',
    text: 'User Management System - Security update.'
}, {
    id: 'R19F9DF9REODF2',
    text: 'Socket Management System - Security update.'
}, {
    id: 'R19F9DF9REODF3',
    text: 'Connection Architecture Update.'
}, {
    id: 'R19F9DF9REODF4',
    text: 'SOAP First Release'
}];

var db = {
    users: users,
    posts: posts,
    comments: comments,
    updates: updates
};

exports.default = db;