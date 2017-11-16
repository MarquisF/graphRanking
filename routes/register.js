const express = require('express');
const router = express.Router();
const User = require('../mongoModels/user');
const registerValidate = require('../public/utilsFullStack/FormValidationRules/RegisterValidation');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('register')
});

router.post('/', (req, res, next) => {
  const { email, username, passcode, passcode_conf } = req.body;

  const validateResult = registerValidate( email, username, passcode, passcode_conf );
  if ( validateResult ) {
    return res.send({
      success: 0,
      msg: validateResult
    })
  } else {
    const newUserData = {
      email: email,
      username: username,
      passcode: passcode
    }

    User.create( newUserData, function ( error, user ) {
      if ( error && error.code == 11000 ) {
        return res.send({
          success: 0,
          msg: 'This email has already been taken'
        })
      } else {
        req.session.userId = user._id;
        return res.send({
          success: 1,
          msg: ''
        })
      }
    })
  }
})

module.exports = router;
