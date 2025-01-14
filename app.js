var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var index = require('./routes/index');
var projects = require('./routes/projects');
var events = require('./routes/events');
var members = require('./routes/members');
var resources = require('./routes/resources');
var about = require('./routes/about');


var app = express();


try //try to load LiveReload
{
  var livereload = require('livereload');
  server = livereload.createServer({exts: ['jade','js','scss','css']});
  server.watch([__dirname + '/public', __dirname + '/sass/', __dirname + '/views', __dirname + '/routes']);
  console.log("LiveReload Started");
}
catch (ex) {}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/stylesheets',require('node-sass-middleware')({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/stylesheets'),
  debug: true,
  outputStyle: 'compressed',
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname+ '/node_modules'));

app.use('/', index);
app.use('/projects', projects);
app.use('/', events);
app.use('/members', members);
app.use('/resources', resources);
app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
