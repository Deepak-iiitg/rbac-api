const mongoose = require('mongoose');
//user field->_id which mongodb will create by default unique for every user
//that's why, i haven't defined _id here.  

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Admin','Manager','Employee']
    },
    department:{
        type:String,
        default:null
    }
})
const userModel = mongoose.model('User',userSchema);
module.exports = userModel;