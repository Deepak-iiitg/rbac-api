require('dotenv').config();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function userSignup(req,res,next){
    try{
       const saltRound = parseInt(process.env.PASSWORD_SALT_ROUND);
       //store user details from req body in user variable
       const user = req.body;
       console.log(user);
       //role should be Admin,Manager or employee, otherwise dont't accept.
       if(!(user.role==='Admin' || user.role==='Manager' || user.role==='Employee')){
           const error = {};
           error.status = 400;
           error.message = "role should be Admin or Manager or Employee";
           return next(error);
       }    
       
       //first check user existence,if already exist then don't create new user with same username
       
       const response = await User.find({username:user.username});
       //User.find() return array of document which match the specify username.
       if(response.length>0){
          //length greater than 0 means this username alredy exist in the database.
          return res.status(200).json({Message:"user already exist"});
       }
       //if role is manager or employee, then department should be there.
       if(user.role === 'Manager' || user.role==='Employee'){
          if(!user.department){
              const error = {};
              error.status = 401;
              error.message = "Department is require for Manager or Employee";
              return next(error);
          }
       }
       const password = req.body.password;

       //get hashed password and store in hashedPassword variable.
       //saltRound define how many rounds processing hashing algorithms
       const hashedPassword = await bcrypt.hash(password,saltRound);

       //change user password with hashedPassword before adding database.
       user.password = hashedPassword;
       const newUser = new User(user);

       //saving in the database
       await newUser.save();
       return res.status(201).json(req.body);
    }catch(error){
      //calling errorHandler middleware
       return next(error);
    }
}

async function userLogin(req,res,next){
    try{
       //check user exist or not.
       const existingUser = await User.find({username:req.body.username});
       //if user is not exist ,then length of existingUser will 0.
       if(existingUser.length === 0){
        const error = {};
        error.status = 404;
        error.message = "user not exist";
        return next(error); 
       }else{
        //checking for password validation.
        const isValidPassword = await bcrypt.compare(req.body.password,existingUser[0].password);
    
        if(isValidPassword){
            const secret_key = process.env.SECRET_KEY;
            
            //creating jwt token with payload and secret_key with expiresIn in 1 hour.
            const payload = {_id:existingUser[0]._id,username:existingUser[0].username,
                role:existingUser[0].role,department:existingUser[0].department};
            
            const newToken = jwt.sign(payload,secret_key,{expiresIn:'1h'});
            return res.status(200).json({token:newToken});
        }else{
            //creating custome error object, with status and message.
            const error = {};
            error.status = 401;
            error.message = "invalid usarname or password";
            //calling errorHandler middleware
            return next(error);
        }
       }
    }catch(error){
        //calling errorHandler middleware
       return next(error);
    }
}
module.exports = {userSignup,userLogin};