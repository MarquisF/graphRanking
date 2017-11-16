const express = require('express');
const router = express.Router();
const User = require('../mongoModels/user');

router.get('/', function (req, res, next) {
  if ( req.session ) {
    req.session.destroy( err => {
      if ( err ) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    })
  }
})

module.exports = router;