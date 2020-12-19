const express =  require('express');
const router = express.Router();
const { signUp, signIn, signOut, requireSignIn } = require("../controllers/auth");
const { userSignUpValidator, userSignInValidator } = require("../validators/index");



router.post('/signup', userSignUpValidator, signUp);
router.post('/signin', userSignInValidator, signIn);
router.get('/signout', signOut);


module.exports = router;