const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { categoryName } = require('../validators');
const { UserByID } = require('../controllers/user');
const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth');


router.get('/categories', list)
router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, categoryName, create);
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, remove);

router.param('categoryId', categoryById);
router.param('userId', UserByID);


module.exports = router;