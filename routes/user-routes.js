const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const obj = require("../controllers/user-controller");
const fileUpload =  require('../middlewares/file-upload')
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

// router.get("/", obj.getUsers);

router.post(
  "/login",
  [check("email").isEmail(),
   check("password").isLength({ min: 5 })],
  obj.login
);

router.post(
  "/signup",
  fileUpload.single('profile-pic') ,
  [
    check("name").not().isEmpty(),
    check("password").isLength({ min: 5 }),
    check("email").isEmail(),
  ],
  obj.signup
);

module.exports = router;
