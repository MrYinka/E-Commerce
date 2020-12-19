//Importing Lodash for Edit Functionality
const _= require('lodash');

//Importing User Model
const User = require('../models/user');

//Error Handler
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.users = (req, res) => {
    res.json({
        Message: "Home Page"
    });
};



exports.UserByID = (req, res, next, id) => {
    //id comes from the route parameter
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User not found"
            });
        }
        //Adds the user info to the profile object
        req.profile = user;
        next();
    });
};


exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => {

    let user = req.profile;
    //Extend mutates the source object
    user = _.extend(user, req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(user);

    });

};