const express =  require('express');
const app = express();
const morgan  = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

//Routes Imports
const userRoutes = require('./routes/users');

//Db Connection
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true } )
    .then(() =>  console.log("DB Connected!!!"));

mongoose.connection.on("error", err  => {
    console.log(`DB Connection failed: ${err.message}`);
});






//Routes Middleware
app.use('/api', userRoutes);



const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`NodeJS API is listening on port: ${port}`);
});