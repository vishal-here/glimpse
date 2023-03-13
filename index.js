const express = require('express');
const mongoose = require('mongoose')
const fs = require('fs') ;
const path = require('path')
require('dotenv').config() ;

const HttpError = require('./models/HttpError');
const placeRoutes = require('./routes/place-routes')
const userRoutes = require('./routes/user-routes')

const app = express() ;
app.use('/uploads/images',express.static(path.join('uploads','images')))

app.use(express.json()) ;
// middleware to handle CORS error 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*') ;
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With , Content-Type , Accept , Authorization') ;
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE') ;
    next() ;
})
//routers
app.use('/api/place',placeRoutes)
app.use('/api/user',userRoutes)

// error handler if all route fails
app.use((res,req,next) => { throw new HttpError("this page is not available..", 404)})
//middle ware

app.use((err,req,res,next)=>{
    if(req.file) fs.unlink(req.file.path , (err)=> {
        console.log(err) ;
    }) ;
    if(res.headerSent) {
        return next(err) ;
    }
    res.status(err.code || 500).json({ message : err.message})
})

//serving frontend
app.use(express.static(path.join(__dirname + './frontend/build'))) ;

app.get('*',(req,res)=>{
    console.log(__dirname + './frontend/build'); 
    res.sendFile(path.join(__dirname+'./frontend/build/index.html'))
})
//start server
try {

    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yhzzkqy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    ).then( ()=>{
        app.listen(process.env.PORT || 4000 , ()=>
        console.log("listening on port 4000")) ;
    })
} catch (error) {
    console.log(error)
}

