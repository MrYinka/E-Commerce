//Importing User Model
const User = require('../models/user');
//Error Handler
const { errorHandler } = require('../helpers/dbErrorHandler');
//Using JSON Web Token - To generate signed token
const jwt = require('jsonwebtoken');
//For Authorization Check
const expressJwt = require('express-jwt');

//User Sign Up
exports.signUp = async (req, res) => {

    //Awaiting user to be found
    const userExists = await User.findOne({email: req.body.email})

    if(userExists){
        return res.status(403).json({
            error: 'User already exist!'
        });
    }

    // Awaiting user to be created
    const user = await new User(req.body);

    //Awaiting user to be saved
    await user.save();
    res.status(200).json({
        Message: 'User Created Successfully!'
    });
};
//User Sign Up Method Ends


//Signin Method
exports.signIn = (req, res) => {
    //Find the user based on email
    const { email, password } = req.body;
    //Finding the using the user model based on the email(From the database)
    User.findOne({email}, (err, user) => {
        //if error or no user
        if(err || !user){
            return res.status(401).json({
                error: "User with this email does not exit! Please Sign Up"
            });
        }

        //if user is found, validate email and password combination
        //Create Authentication Method in user model and use here!

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Incorrect Email and Password combination"
            });
        }

        //Generate a Signed Token with userID and Secret
        const token  = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        //Persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});

        //return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return  res.json({token, user: {_id, email, name, role}});

    });
};
//Sign In Method Ends

//Signout Method
exports.signOut = (req, res) => {
    res.clearCookie('t');
    return res.json({
        message: "Sign out successful!"
    });
};
//Signout Method Ends


//Protecting Routes
//Note: Cookie-Parser must be installed!
exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
});
//Protecting Routes Ends


//Authorization for Authenticated Users
exports.isAuth = (req, res, next) => {
    //Note: req.auth is from the userProperty of requireSignIn
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
};
//Authorization for Authenticated Users Ends

//Admin User Resource
exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Admin Resources. Unauthorized! Access Denied!"
        });
    }
    next();
};
//Admin User Resource Ends