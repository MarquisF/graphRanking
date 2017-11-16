const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  passcode: {
    type: String,
    required: true,
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function ( email, passcode, callback ) {
  User.findOne({ email: email }).exec( function ( err, user ) {
    if (err) {
      return callback(err)
    } else if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(passcode, user.passcode, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    })
  })
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.passcode, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.passcode = hash;
    next();
  })
});

const User = mongoose.model('User', UserSchema);
module.exports = User;