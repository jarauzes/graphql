// named export - Has a name. Have as many as needed. Have as many as needed;
// Default export - Has no name. You can only have one.

const message = 'Some Message from myModule.js';

const name = 'Joe';

const location = 'Düsseldorf, Germany';

const getGreeting = (name) => {
    return `Welcome to the course ${name}`;
}

export { message, name, getGreeting, location as default }