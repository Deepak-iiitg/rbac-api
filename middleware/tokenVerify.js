require('dotenv').config();

const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

function isValidToken(req,res,next){
    try{
        //getting token from req headers
        const token = req.headers.token;
        
        if(!token){
            const error = {};
            error.status = 403;
            error.message = "Access Denied!";
            return next(error);
        }

        //verifying and decoding the token to fetch user details
        const isValid = jwt.verify(token,secret_key,(error,decodedToke)=>{
            if(error){
               return next(error);
            }
            console.log(decodedToke);
            //adding user obejct as key in the req. to identify the user role and other details
            req.user = {role:decodedToke.role,_id:decodedToke._id,department:decodedToke.department};
            next();
        });
    }catch(error){
        //checking for invalid signature or token expire.
        if(error.message.includes("invalid signature")){
            error.message = 'invalid token or token expired';
        }
        return next(error);
    }
}
module.exports = isValidToken;