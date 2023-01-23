const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const obj = require("../controllers/user-controller");

const users = [
  {
    id: "u1",
    name: "vishal",
    email: "b200059@nitsikkim.ac.in",
    password: "b200059",
  },
  {
    id: "u2",
    name: "manish",
    email: "b200060@nitsikkim.ac.in",
    password: "b200060",
  },
  {
    id: "u3",
    name: "vishal",
    email: "b200060@nitsikkim.ac.in",
    password: "b200060",
  },
];

router.get("/", obj.getUsers);

router.post("/login", obj.login);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("password").isLength({ min: 5 }),
    check("email").isEmail(),
  ],
  obj.signup
);

module.exports = router;
