require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auths');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandling');
const dbConnect = require('./models/dbConnection');

app.use(cors({origin:true}));
app.use(bodyParser.json({extended:true}));

//calling dbConnect function to connect with database.
dbConnect();


app.use('/auth',authRouter);
app.use('/tasks',taskRouter);
app.use('/user',userRouter);
app.use(errorHandler);
app.listen(PORT || 8080,()=>{
    console.log('server runnig on port '+PORT);
})