require('dotenv').config();
const mongoose = require('mongoose');
const errorHandler = require('../middleware/errorHandling');
const DB_URL = process.env.DB_URL;
async function dbConnect(){
   try{
      await mongoose.connect(DB_URL);
      console.log('db connected');
   }catch(error){
      console.log('db connection error');
   }
}
module.exports = dbConnect;