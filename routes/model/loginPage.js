const User = require('../../mongoModels/user');

module.exports = function(req, res, next) {
  User.findById( req.session.userId ).exec((error, user) => {
    if ( error ) {
      console.log('error:', error)
      return next(error);
    } else {
      if ( user === null ) {
        return res.render('login');
      } else {
        return res.redirect('/dashboard')
      }
    }
  })
}