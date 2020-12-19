const express =  require('express');
const app = express();
const morgan  = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

//Routes Imports
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

//Db Connection
mongoose.connect(process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
    .then(() =>  console.log("DB Connected!!!"));

mongoose.connection.on("error", err  => {
    console.log(`DB Connection failed: ${err.message}`);
});


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//Routes Middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`NodeJS API is listening on port: ${port}`);
});