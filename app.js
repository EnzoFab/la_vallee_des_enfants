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

const unlessPath = ['/employeur/login', '/assmats/login', 'posts/all']
app.use(expressJwt({ secret: process.env.JWT_SECRET }).unless({ path: unlessPath}));
// verifie le token dans le header sauf pour les routes dans unless


/* ======================  ROUTES ================================================ */
app.use('/employeurs', EmployeurRouter);
app.use('/assmats', assMatRouter);
app.use('/evenements', evenementRouter);
app.use('/modepaiements', modeDePaiement);
app.use('/typeContrat', typeDeContrat);
app.use('/typeTuteur', typeTuteur);
app.use('/frais', frais);
app.use('/enfants', enfant);
app.use('/tuteurs', tuteur);
app.use('/employeurs', employeur);
app.use('/contrat', contrat);
app.use('/presencetheo', presencetheo);
app.use('/posts', post);
app.use('/files', files);
app.use('/mail', mail);
app.use('/typeJour', typejour)
app.use('/employeurs', employeur);
app.use('/contrat', contrat);
app.use('/presencetheo', presencetheo);
app.use('/presencereelle', presencereelle);
app.use('/employeurs', employeur)
app.use('/contrat', contrat),
app.use('/presencetheo', presencetheo),
app.use('/posts', post)
app.use('/files', files)
app.use('/factures', facture)



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var chat = io
    .of('/post')
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
        });*/
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
  res.render('error');
});



module.exports = {app: app, server: server};