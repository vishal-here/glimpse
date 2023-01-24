const { validationResult } = require("express-validator");
const HttpError = require("../models/HttpError");
const User = require("../models/User");
// const users = [
//   {
//     id: "u1",
//     name: "vishal",
//     email: "b200059@nitsikkim.ac.in",
//     password: "b200059",
//   },
//   {
//     id: "u2",
//     name: "manish",
//     email: "b200060@nitsikkim.ac.in",
//     password: "b200060",
//   },
//   {
//     id: "u3",
//     name: "vishal",
//     email: "b200060@nitsikkim.ac.in",
//     password: "b200060",
//   },
// ];

// let idGenerator = 4;

const getUsers = async (req, res, next) => {
  let users ;
  try {
    users = await User.find({} , '-password') ;
  } catch (e) {
   return next(e) ; 
  }
  if(users.length===0) return next(new HttpError("No users are here currently "))
  res.status(200).json(
    {
      user : users.map(user => user.toObject())
    }
  )
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid Credentials", 422));
    return;
  }
  // const hasUser = users.find(u => u.email === email);
  // if (hasUser) {
  //   throw new HttpError('Could not create user, email already exists.', 422);
  // }
  let obj;
  try {
    obj = await User.findOne({ email: email });
  } catch (e) {
    return next(e);
  }
  if (obj) return next(new HttpError("Email already exist .. "));

  const createdUser = new User({
    name, // name: name
    email,
    password,
    places : [],
    image: "dummy image",
  });

  // users.push(createdUser);
  try {
    await createdUser.save();
  } catch (e) {
    return next(e);
  }

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = users.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

const obj = { getUsers, login, signup };
module.exports = obj;
