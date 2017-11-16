const express = require('express')
const router = express.Router();
const User = require('../mongoModels/user');

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
// })
router.use( function ( req, res, next ) {
  next();
})
// define the home page route
router.get('/', function (req, res) {
  User.findById(req.session.userId).exec(( error, user ) => {
    if ( error ) {
      return next(error);
    } else {
      if ( user === null ) {
        return res.redirect('/')
      } else {
        const { email, username } = user;
        return res.render('dashboard', {
          email, username
        })
      }
    }
  })
})

module.exports = router