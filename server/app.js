var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));  // unnecessary for backend server, views folder can remove now
// app.set('view engine', 'jade');  // unnecessary for backend server, views folder can remove now

app.use(logger('dev'));
app.use(express.json());  // get request post data for 'content-type' = 'application/json' and save to req.body
app.use(express.urlencoded({ extended: false }));  // get request post data for x-www-form-urlencoded: k=v&k2=v2  and save to req.body
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));  // unnecessary for backend server, public can remove now

app.use('/', indexRouter);  // register index roter
app.use('/users', usersRouter);  // register users rooter with base url name
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};  // should be same as NODE_ENV

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
