//Importing Lodash for Edit Functionality
const _ = require('lodash');
//Importing Category Model
const Category = require('../models/category');
//Error Handler
const { errorHandler } = require('../helpers/dbErrorHandler');



//Getting Category ID passed to the route
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: "Category does not exist!"
            });
        }
        req.category = category;
        next();
    });
};


//Create Category
exports.create = async (req, res) => {
    const categoryExist  = await Category.findOne({name: req.body.name});

    if(categoryExist){
        return res.status(403).json({
            error: 'Category Already Exist!'
        });
    }

    const newCategory = await new Category(req.body);
    await newCategory.save((err, data) => {
       if(err){
           return res.status(400).json({
               error: errorHandler(err)
           });
       }

       res.status(200).json({
           data
       });
    });

};


//Read Category
exports.read = (req, res) => {
    return res.json(req.category);
};
//Read Category Ends


//Update Category
exports.update = (req, res) => {
    let category = req.category;

    //Extend mutates the source object
    category = _.extend(category, req.body);

    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);

    });
};


//Delete Category
exports.remove = (req, res) => {
    let category = req.category;
    category.remove((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Category Deleted!"
        });
    });
};


exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


