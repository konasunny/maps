var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var mapTrackRouter = require('./routes/mapTrackRoutes');
const mongo_uri = 'mongodb://maps-admin:Caprus1@ds113454.mlab.com:13454/sandeep-maps';
var cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); 
// ROutes Setup
app.use('/api', mapTrackRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.header("Access-Control-Allow-Origin", "https://10.30.2.117:4200/");
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// DB Setup


mongoose.connect(mongo_uri, { useNewUrlParser: true })
  .then((database) => {
    app.emit('db-ready');
  }).catch(error => console.error(error));

module.exports = app;