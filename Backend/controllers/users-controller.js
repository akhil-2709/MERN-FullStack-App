const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Akhil Reddy',
        email: 'akhil@test.com',
        password: 'testers'
    }
];

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};

const signup = (req, res, next) => {
    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError ('User already Exists!', 422);
    }

    const createdUser = {
        id: uuid(),
        name,
        email, 
        password
    };
    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const {email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password === password) {
        throw new HttpError('Invalid Credentials! UserName/Password is wrong', 401);
    }

    res.json({message: 'Logged In'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;