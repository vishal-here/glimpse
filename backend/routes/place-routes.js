const express = require("express");
const { check } = require("express-validator");
const fileUpload = require('../middlewares/file-upload')

const router = express.Router();

const checkAuth = require('../middlewares/check-auth')
const HttpError = require("../models/HttpError");
const obj = require("../controllers/place-controller");

router.get("/user/:uid", obj.getElementByUser);

router.get("/:pid", obj.getElementByPlace);

router.use(checkAuth)

router.post(
  "/",
    fileUpload.single('placePic') ,
  [
    check("title").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  obj.getCreatedElement
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  obj.getUpdatedElement
);

router.delete("/:pid", obj.getDeletedElement);

module.exports = router;
