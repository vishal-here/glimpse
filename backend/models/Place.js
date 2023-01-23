const mongoose= require('mongoose')

const PlaceTable = mongoose.Schema({
    title : {type : String , required: true},
    description : {type : String , required: true},
    address : {type : String , required: true},
    creater : {type : String , required: true},
    image : {type :String},
    location :{
        lat :{type :Number , required : true},
        long :{type :Number , required : true}
    }
}) ;

module.exports = mongoose.model('Place',PlaceTable)