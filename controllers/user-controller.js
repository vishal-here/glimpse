const { validationResult } = require("express-validator");
const HttpError = require("../models/HttpError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const cloudinary = require("../utils/cloudinary");
const getDataUri = require('../utils/DataUri') ;
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
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (e) {
    return next(e);
  }
  if (users.length === 0)
    return next(new HttpError("No users are here currently ", 404));
  res.status(200).json({
    user: users.map((user) => user.toObject()),
  });
};

const signup = async (req, res, next) => {
  console.table(req.body);
  console.log(req.file);
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!req.file) {
    next(new HttpError("Must upload a profile picture", 422));
    return;
  }
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid Credentials !", 422));
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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could'nt hash the password ! Unsafe", 500));
  }
  
  const recievedFile = req.file ;
  const fileUri= getDataUri(recievedFile) ;
  // console.log(fileUri) ;
   
  let result;
  try {
  //  console.log(req.file);
   result = await cloudinary.uploader.upload(fileUri.content , {
      folder:"uploads"
    })
    console.log(result)
  } catch (err) {
    return next(new Error(err)) ;
  }
  const createdUser = new User({
    name, // name: name
    email,
    password: hashedPassword,
    places: [],
    image: result.secure_url,
  });

  // users.push(createdUser);
  try {
    await createdUser.save();
    console.log("user created successfully");
  } catch (e) {
    console.log("could'nt create new user : (");
    return next(e);
  }

  let token;
 try {
  token = jwt.sign(
    { userId: createdUser._id, email: createdUser.email },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );

 } catch (err) {
  return next(new HttpError("Signup failed ! Can't generate token " , 500))
 }
  res.status(201).json({ user: createdUser, token});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Credentials", 401));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could'nt hash the password ! Unsafe", 500));
  }

  let result;
  try {
    console.log(password )
    result = await User.findOne({ email, hashedPassword });
  } catch (err) {
    return next(err);
  }
  if (!result) {
    return next(new HttpError("No such user Exist , Please signup "));
  }

  let isValid = false;
  try {
    isValid = await bcrypt.compare(password, result.password);
  } catch (err) {
    return next(new HttpError("Please try again ", 500));
  }

  if (!isValid) {
    return next(new HttpError("Invalid credentials !! ", 401));
  }

  
  let token;
 try {
  token = jwt.sign(
    { userId: result._id, email: result.email },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );
console.log(token)
 } catch (err) {
  return next(new HttpError("Login failed ! Can't generate token " , 500))
 }
 

  res
    .status(200)
    .json({ message: "Logged in successfully", user: result.toObject() , token });

  // const identifiedUser = users.find((u) => u.email === email);
  // if (!identifiedUser || identifiedUser.password !== password) {
  //   throw new HttpError(
  //     "Could not identify user, credentials seem to be wrong.",
  //     401
  //   );
  // }

  // res.json({ message: "Logged in!" });
};

const obj = { getUsers, login, signup };
module.exports = obj;
