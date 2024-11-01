const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    department:{
       type:String,
       required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
const taskModel = mongoose.model('Task',taskSchema);
module.exports = taskModel;
