const mongoose = require('mongoose') ;
const uniqueValidator=  require('mongoose-unique-validator') ;

const users= mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true, unique :true},
    password : {type : String , required : true , minLength : 6},
    image : {type : String },
    places : [{ type : mongoose.Types.ObjectId, required : true,  ref : 'Place'}],
})

users.plugin(uniqueValidator) ;
module.exports = mongoose.model('User' , users)