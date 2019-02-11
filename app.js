var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
// var crypto = require('crypto');
// password = crypto.pbkdf2Sync("123", "6ab9ff994809e4aee87fdbd76ac47c64", 10000, 512, 'sha512').toString('hex');
// const buf = crypto.randomBytes(16);
// console.log(
//   `${password.length} bytes of random data: ${password.toString('hex')}`);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gitRouter = require('./routes/git');
var bootstrapRouter = require('./routes/bootstrap');

var app = express();
// Kết nối MongoDB
mongoose.connect("mongodb://dinhvanha123:dinhvanha123@ds163014.mlab.com:63014/passauthen",function(){
  console.log('Connect MongoDb success');
})

// Cấu hình passport
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave : false,
  saveUninitialized : false,
  cookie : {
      maxAge : 1000*60*5
  }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/git', gitRouter);
app.use('/bootstrap', bootstrapRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
