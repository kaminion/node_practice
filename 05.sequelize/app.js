var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rfs = require("rotating-file-stream");
var methodOverride = require('method-override');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require("./routes/board");

var app = express();
var {sequelize} = require("./models");
sequelize.sync({forced:true});
var logDirectory = path.join(__dirname, 'log'); // 디렉토리 생성


// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) //로그를 파일로 저장하겠다
// app.use(logger('combined', { stream: accessLogStream }));

/** 이 아래는 로테이트 */
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
 
// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory,
  size: "10M",
  compress: "gzip"
})
 
// setup the logger
app.use(logger('combined', { stream: accessLogStream }))
// 파일을 한번씩 청소함

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev')); // 모건이 로그를 남김, 얜 없어도 됨 (터미널 전용)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 폼쓸땐 필요
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);

// catch 404 and forward to error handler

// 라우터로 들어가지못하면 404 error를 띄워버림
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  // 이 메세지는 error.pug에 담겨져있다., response 객체에 전역등록
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
