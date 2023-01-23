const { validationResult } = require("express-validator");

const HttpError = require("../models/HttpError");

let places = [
  {
    id: "p1",
    title: "nitsikkim",
    desc: " This college is present in the owe of Nature's beauty ..",
    imgUrl: "https://i.ytimg.com/vi/roWr_swPSHU/maxresdefault.jpg",
    address: "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139",
    location: {
      lat: 40.48613,
      long: 108.6664,
    },
    creater: "u2",
  },
  {
    id: "p2",
    title: "nitsikkim",
    desc: " This college is present in the owe of Nature's beauty ..",
    imgUrl: "https://math.nitsikkim.ac.in/assets/images/campus1.jpg",
    address: "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139",
    location: {
      lat: 40.48613,
      long: 108.6664,
    },
    creater: "u1",
  },
  {
    id: "p3",
    title: "Ravangle",
    desc: " This place is located at height more than 6000 feets",
    imgUrl:
      "https://images.news18.com/ibnlive/uploads/2021/10/sikkim-163523522416x9.jpg",
    address: " Ravangla, Sikkim",
    location: {
      lat: 40.48613,
      long: 108.6664,
    },
    creater: "u1",
  },
];
let idGenerator = 4;
const getElementByPlace = (req, res, next) => {
  const pid = req.params.pid;
  const obj = places.filter((x) => {
    return x.id === pid;
  });
  if (obj.length === 0) next(new HttpError("invalid place id", 404));
  else res.json(obj);
};

const getElementByUser = (req, res) => {
  const uid = req.params.uid;
  const obj = places.find((x) => {
    return x.creater === uid;
  });
  if (!obj) {
    next(new HttpError("invalid user id ", 404));
  } else res.json(obj);
};

const getCreatedElement = (req, res, next) => {
  const { title, desc, address, coordinates, uploader } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("invalid inputs :( ", 422);
  }
  const createdPlace = {
    id: `p${idGenerator++}`,
    title,
    desc,
    address,
    location: coordinates,
    creater: uploader,
  };
  places.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};
const getUpdatedElement = (req, res, next) => {
  const { title, description, address } = req.body;
  const errors = validationResult(req) ;
  if (!errors.isEmpty()) {
    throw new HttpError("invalid inputs :( ", 422);
  }
  const pid = req.params.pid;
  const copy = { ...places.find((p) => p.id === pid) };
  copy.title = title;
  copy.desc = description;
  copy.address = address;
  res.status(200).json(copy);
};
const getDeletedElement = (req, res, next) => {
  const pid = req.params.pid;
  const temp = places.find((p)=> p.id===pid);
  if(!temp) throw new HttpError("place does not exist") ;
  const copy = places.filter((p) => p.id !== pid);
  places = copy;
  res.status(200).json({ message: "deleted successfully !!" });
};
const obj = {
  getElementByPlace,
  getElementByUser,
  getCreatedElement,
  getUpdatedElement,
  getDeletedElement,
};
module.exports = obj;
