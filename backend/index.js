const express = require('express');
const HttpError = require('./models/HttpError');

const placeRoutes = require('./routes/place-routes')
const userRoutes = require('./routes/user-routes')

const app = express() ;

//routers
app.use(express.json()) ;
app.use('/api/place',placeRoutes)
app.use('/api/user',userRoutes)

// error handler if all route fails
app.use((res,req,next) => { throw new HttpError("this page is not available..", 404)})
//middle ware
app.use((err,req,res,next)=>{
    if(res.headerSent) {
        return next(err) ;
    }
    res.status(err.code || 500).json({ message : err.message})
})

//start server
app.listen(4000 , ()=>
console.log("listening on port 4000")
) ;