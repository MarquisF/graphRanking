var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// mongodb
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

require('./mongoModels/user');
require('./mongoModels/chartInventory');
require('./mongoModels/score');

// local
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');
var choice = require('./routes/choice');
var progress = require('./routes/progress');
var ranking = require('./routes/ranking');
var logout = require('./routes/logout');
const User = require('./mongoModels/user');

var app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost/graphBook', {
  useMongoClient: true
})
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log( 'Connected to MongoDB.');
  // we're connected!
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/register', register);

app.use(( req, res, next ) => {
  User.findById(req.session.userId).exec(( error, user ) => {
    if ( error ) {
      return next(error);
    } else {
      if ( user === null ) {
        return res.redirect('/')
      } else {
        next()
      }
    }
  })
})
app.use('/dashboard', dashboard);
app.use('/progress', progress);
app.use('/ranking', ranking);
app.use('/choice', choice);
app.use('/logout', logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
