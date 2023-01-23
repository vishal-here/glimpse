class HttpError extends Error{
    constructor(errMsg,errCode){
        super(errMsg) // add message property in object
        this.code = errCode // add code property in object 
    }
}
module.exports = HttpError;