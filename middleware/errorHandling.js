
//This is error Handler middle.
const errorHandler = (error,req,res,next)=>{
    return res.status(error.status || 500).json({message:error.message || 'Internal server error'});
}

module.exports = errorHandler;