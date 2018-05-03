var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();
var server = require('http').Server(app);

var io = require('socket.io').listen(server); // chargement de socket io qui permet le temps réel

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var parentRouter = require('./routes/parent');
var assMatRouter = require('./routes/assmat');
var evenementRouter = require('./routes/evenement');
var modeDePaiement = require('./routes/modeDePaiement');
var typeDeContrat = require('./routes/typeDeContrat')

// use it before all view definitions
app.use(cors({origin: '*'}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ======================  ROUTES ================================================ */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parents', parentRouter);
app.use('/assmats', assMatRouter);
app.use('/evenements', evenementRouter);
app.use('/modepaiements', modeDePaiement);
app.use('/typeContrat', typeDeContrat);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// rends socket io accessible a toutes les routes
app.use(function(req,res,next){
    req.io = io;
    next();
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



module.exports = {app: app, server: server};