const express = require('express');
const router = express.Router();
const User = require('../mongoModels/user');
const getLoginPage = require('./model/loginPage');

/* GET home page. */
router.get('/', getLoginPage);

module.exports = router;