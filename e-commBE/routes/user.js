const express =  require('express');
const router = express.Router();
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth")
const { UserByID, users, update, read } = require("../controllers/user");


router.get('/', users);
router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user : req.profile
    });
});

router.get('/user/:userId', requireSignIn, isAdmin, read);
router.put('/user/:userId', requireSignIn, isAdmin, update);


router.param('userId',  UserByID);

module.exports = router;