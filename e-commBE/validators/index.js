exports.userSignUpValidator = (req, res, next) => {
    //Firstname Validation
    req.check('firstname', 'Firstname is required').notEmpty();
    req.check('firstname')
        .isLength({
            min:4,
            max:32
        })
        .withMessage('Firstname must be between 4 to 32 characters');

    //Lastname Validation
    req.check('lastname', 'Lastname is required').notEmpty();
    req.check('lastname')
        .isLength({
            min:4,
            max:32
        })
        .withMessage('Lastname must be between 4 to 32 characters');

    //Email Validation
    req.check('email', 'Email must be between 3 to 32 Characters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });


    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({min:6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");

    const errors = req.validationErrors();
    //Show errors as they appear
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return  res.status(400).json({error: firstError});
    }
    //Proceed to next middleware
    next();
};


exports.userSignInValidator = (req, res, next) => {
    //Email Validation
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32 Characters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });

    req.check('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    //Show errors as they appear
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return  res.status(400).json({error: firstError});
    }
    //Proceed to next middleware
    next();
};

exports.categoryName = (req, res, next) => {
    //Category name validator
    req.check('name', 'Category name is required').notEmpty();

    const errors = req.validationErrors();
    //Show errors as they appear
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return  res.status(400).json({error: firstError});
    }
    //Proceed to next middleware
    next();
};