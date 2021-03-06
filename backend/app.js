var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var mongoose = require('mongoose');
var url = require('./DB/credential');

require('dotenv').config();

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var bankRouter = require('./routes/bank');

var app = express();

// view engine setup  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave:false,
  saveUninitialized: false,
  secret:process.env.COOKIE_SECRET,
  store : new FileStore(),
  cookie : {maxAge : 60 * 60 * 1000 * 24}
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, dbname:"money"});

app.use(require('connect-history-api-fallback')());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/bank', bankRouter);

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