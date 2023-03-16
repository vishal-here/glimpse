const DatauriParser = require('datauri/parser');
const path = require('path')
const getDataUri = (file) => { 
  
    const parser = new DatauriParser() ;
    const extName= path.extname(file.originalname).toString() ;
    // console.log(extName) ;
    return parser.format(extName , file.buffer)
 }
 module.exports = getDataUri ;