var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fileUpload = require('express-fileupload');
var helmet = require('helmet');
var expressJwt = require('express-jwt');


var app = express();
var server = require('http').Server(app);

var io = require('socket.io').listen(server); // chargement de socket io qui permet le temps réel

require('dotenv').config();

/*
============================ ROUTERS ========================================
 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var EmployeurRouter = require('./routes/employeur');
var assMatRouter = require('./routes/assmat');
var evenementRouter = require('./routes/post');
var modeDePaiement = require('./routes/modeDePaiement');
var typeDeContrat = require('./routes/typeDeContrat');
var typeTuteur = require('./routes/typeTuteurs');
var enfant = require('./routes/enfant');
var frais = require('./routes/frais');
var tuteur = require('./routes/tuteur');
var employeur = require('./routes/employeur');
var contrat = require('./routes/contrat');
var presencetheo = require('./routes/presenceTheorique');
var presencereelle = require('./routes/presenceReelle');
var post = require('./routes/post');
var files = require('./routes/files');
var mail = require('./routes/mail');
var typejour = require('./routes/typeJour');
var facture = require('./routes/facture');


// use it before all view definitions
app.use(cors({origin: '*'}))
app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/static', express.static(__dirname + '/public'));
app.use(fileUpload());

const unlessPath = ['/api/employeurs/login', '/api/assmats/login', '/api/posts/all', '/api/posts/', '/api/assmats/register', '/favicon.ico']
app.use('/api/',expressJwt({ secret: process.env.JWT_SECRET }).unless({ path: unlessPath}));

/* ======================  ROUTES ================================================ */
app.use('/api/employeurs', EmployeurRouter);
app.use('/api/assmats', assMatRouter);
app.use('/api/evenements', evenementRouter);
app.use('/api/modepaiements', modeDePaiement);
app.use('/api/typeContrat', typeDeContrat);
app.use('/api/typeTuteur', typeTuteur);
app.use('/api/frais', frais);
app.use('/api/enfants', enfant);
app.use('/api/tuteurs', tuteur);
app.use('/api/employeurs', employeur);
app.use('/api/contrat', contrat);
app.use('/api/presencetheo', presencetheo);
app.use('/api/posts', post);
app.use('/api/files', files);
app.use('/api/mail', mail);
app.use('/api/typeJour', typejour)
app.use('/api/employeurs', employeur);
app.use('/api/contrat', contrat);
app.use('/api/presencetheo', presencetheo);
app.use('/api/presencereelle', presencereelle);
app.use('/api/employeurs', employeur)
app.use('/api/contrat', contrat),
app.use('/api/presencetheo', presencetheo),
app.use('/api/posts', post)
app.use('/api/files', files)
app.use('/api/factures', facture)


// verifie le token dans le header sauf pour les routes dans unless
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

var chat = io
    .of('/api/post')
    .on('connection', function (socket) {
        console.log('Nouveau client')
        socket.on('nouveauPost', function (data) {
            socket.broadcast.emit('nouveauPost', data)
        })

        socket.on('suppressionPost', function (data){
            socket.broadcast.emit('suppressionPost', data)
        })
        /*socket.on('post', function (val) {
            console.log(val)
            this.emit('nouveauPost', {msg: 'Contrat'})
        })
        socket.emit('message', {
            that: 'only'
            , '/post': 'will get'
        });
        chat.emit('message', {
            everyone: 'in'
            , '/post': 'will get'
        }); */
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
    //next(createError(404));
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
  res.json({ error : err});
});



module.exports = {app: app, server: server};