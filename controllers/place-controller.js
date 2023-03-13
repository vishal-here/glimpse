const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

const fs = require('fs') ;
const HttpError = require("../models/HttpError");
const Place = require("../models/Place");
const User = require("../models/User");
// let places = [
//   {
//     id: "p1",
//     title: "nitsikkim",
//     desc: " This college is present in the owe of Nature's beauty ..",
//     imgUrl: "https://i.ytimg.com/vi/roWr_swPSHU/maxresdefault.jpg",
//     address: "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139",
//     location: {
//       lat: 40.48613,
//       long: 108.6664,
//     },
//     creater: "u2",
//   },
//   {
//     id: "p2",
//     title: "nitsikkim",
//     desc: " This college is present in the owe of Nature's beauty ..",
//     imgUrl: "https://math.nitsikkim.ac.in/assets/images/campus1.jpg",
//     address: "79X4+2W7, Barfung Block, Ravangla, Sikkim 737139",
//     location: {
//       lat: 40.48613,
//       long: 108.6664,
//     },
//     creater: "u1",
//   },
//   {
//     id: "p3",
//     title: "Ravangle",
//     desc: " This place is located at height more than 6000 feets",
//     imgUrl:
//       "https://images.news18.com/ibnlive/uploads/2021/10/sikkim-163523522416x9.jpg",
//     address: " Ravangla, Sikkim",
//     location: {
//       lat: 40.48613,
//       long: 108.6664,
//     },
//     creater: "u1",
//   },
// ];
// let idGenerator = 4;
const getElementByPlace = async (req, res, next) => {
  const pid = req.params.pid;
  // const obj = places.find((x) => {
  //   return x.id === pid;
  // });
  let obj ;
  try {
    obj= await Place.findById(pid)
  } catch (e) {
    return next(e) ;
  }
  if (!obj) next(new HttpError(" place id do not exit", 404));
  else res.json(obj);
};

const getElementByUser =async (req, res ,next) => {
  const uid = req.params.uid;
  // const obj = places.filter((x) => {
  //   return x.creater === uid;
  // });
  let arr;
  try {
    arr = await Place.find({creater : uid})
  } catch (e) {
    return next(e);
  }
  if (!arr || arr.length===0) {
    next(new HttpError("No places has been added by the user  ", 404));
  } else res.json({places : arr.map(x => x.toObject())});
};

const getCreatedElement = async (req, res, next) => {
  const { title, desc, address, uploader } = req.body;
  let coordinates = {
    lat: 30.406616,
    long: -10.51515,
  } ;
  console.log(req.body);
  const errors = validationResult(req);
  if(!req.file){
   return  next(new HttpError("Must upload a place picture", 422));
  }
  if (!errors.isEmpty()) {
     return next(new HttpError("invalid inputs :( ", 422) ) ;
  }
  // const createdPlace = {
  //   id: `p${idGenerator++}`,
  //   title,
  //   desc,
  //   address,
  //   location: coordinates,
  //   creater: uploader,
  // };
  console.log(coordinates)
  const createdPlace = new Place({
    title,
    description: desc,
    address,
    location: coordinates,
    image: req.file.path,
    creater: uploader,
  });
  let user ;
  try {
    user = await User.findById(createdPlace.creater) ;
  } catch (e) {
    return next(new HttpError("something went wrong ", 500))
  }
  if(!user) return next(new HttpError("user is not recognized" , 500))
  
  // places.push(createdPlace);
  try {
    // creating a place and adding the place id  in user table who has created the place
    // session is created and transaction starts :
    let sessId = await mongoose.startSession() ;
      sessId.startTransaction() ;
      await createdPlace.save ({session : sessId}) ;
      user.places.push(createdPlace._id) ;
      await user.save( {session : sessId})
      sessId.commitTransaction() ;

  } catch (err) {
    return next(err) ;
  }
  res.status(201).json({ place: createdPlace });
};
const getUpdatedElement = async (req, res, next) => {
  const { title, description, address } = req.body;
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
     return next(new HttpError("invalid inputs :( ", 422)) 
  }
  const pid = req.params.pid;
  // const copy = { ...places.find((p) => p.id === pid) };
  // copy.title = title;
  // copy.desc = description;
  let obj ;
  try {
    obj= await Place.findById(pid)
  } catch (e) {
    return next(e) ;
  }
  // copy.address = address;
  // obj.toObject() ;
  // obj.title = title ;
  // obj.desciption = description ;
  // obj.address = address ;
  // console.log(obj);

  if(obj.creater.toString() !== req.userData.userId) {
    return next(new HttpError('You are not allowed to Edit the place details !' , 401))
  }
  try {
    await obj.update({
      title,
      description,
      address
    }) ;
  } catch (e) {
    return next(e)
  }
  res.status(200).json(obj);
};
const getDeletedElement = async (req, res, next) => {
  const pid = req.params.pid;
  // const temp = places.find((p) => p.id === pid);
  let place ;
  try {
     place = await Place.findById(pid).populate('creater') ;
  } catch (e) {
    return next(e) ;
  }

  if (!place) return  next(new HttpError("place does not exist")) ;
  if(place.creater._id.toString() !== req.userData.userId) {
    return next(new HttpError('You are not allowed to delete this place !' , 401))
  }
  
  const imagePath = place.image

  try {
      const sess = await mongoose.startSession() ;
       sess.startTransaction() ;
       await place.remove({session : sess}) ;
       place.creater.places.pull(place._id);
       await place.creater.save({session : sess}) ;
       sess.commitTransaction() ;
  } catch (err) {
    return next(err) ;
  }

  // const copy = places.filter((p) => p.id !== pid);
  // places = copy;
  fs.unlink(imagePath , err =>{
    console.log(err)
  })
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
