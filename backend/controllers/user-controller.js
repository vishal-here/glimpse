
const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');

const users = [
  {
    id: 'u1',
    name: 'vishal',
    email: 'b200059@nitsikkim.ac.in',
    password: 'b200059'
  },
  {
    id: 'u2',
    name: 'manish',
    email: 'b200060@nitsikkim.ac.in',
    password: 'b200060'
  },
  {
    id: 'u3',
    name: 'vishal',
    email: 'b200060@nitsikkim.ac.in',
    password: 'b200060'
  },
];

let idGenerator=4 ;

const getUsers = (req, res, next) => {
  res.json({ users });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors= validationResult(req) ;
  if(!errors.isEmpty()) throw new HttpError("Invalid Credentials" ,422) ;
  const hasUser = users.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    id: `u${idGenerator++}`,
    name, // name: name
    email,
    password
  };

  users.push(createdUser);

  res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = users.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({message: 'Logged in!'});
};

const obj = {getUsers,login,signup} ;
module.exports =obj ;