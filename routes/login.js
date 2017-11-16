const express = require('express');
const router = express.Router();
const User = require('../mongoModels/user');
const getLoginPage = require('./model/loginPage');
const loginValidate = require('../public/utilsFullStack/FormValidationRules/LoginValidation');

router.get('/', getLoginPage);

router.post('/', (req, res, next) => {
  let { email, passcode } = req.body;

  // if ( email && passcode ) {
  const validateResult = loginValidate( email, passcode );
    if ( validateResult ) {
      return res.send({
        success: 0,
        msg: validateResult
      })
    } else {
      User.authenticate( email, passcode, function (error, user) {
        if ( error || !user ) {
          console.log('error:', error);
          return res.send({
            success: 0,
            msg: 'Email or password is not correct.'
          });
        } else {
          req.session.userId = user._id;
          return res.send({
            success: 1,
            msg: ''
          });
        }
      })
    }
  // } else {
  //   return res.send('/dashboard')
  // }
})

module.exports = router;