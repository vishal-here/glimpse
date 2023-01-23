const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const HttpError = require("../models/HttpError");
const obj = require("../controllers/place-controller");

router.get("/user/:uid", obj.getElementByUser);

router.get("/:pid", obj.getElementByPlace);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("address").not().isEmpty(),
    check("desc").isLength({ min: 5 }),
  ],
  obj.getCreatedElement
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("address").not().isEmpty(),
    check("desc").isLength({ min: 5 }),
  ],
  obj.getUpdatedElement
);

router.delete("/:pid", obj.getDeletedElement);

module.exports = router;
