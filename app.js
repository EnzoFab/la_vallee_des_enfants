const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const expressJwt = require('express-jwt');


const app = express();
const server = require('http').Server(app);

const io = require('socket.io').listen(server); // chargement de socket io qui permet le temps réel

require('dotenv').config();

/*
============================ ROUTERS ========================================
 */
const EmployeurRouter = require('./routes/employeur');
const assMatRouter = require('./routes/assmat');
const evenementRouter = require('./routes/post');
const modeDePaiement = require('./routes/modeDePaiement');
const typeDeContrat = require('./routes/typeDeContrat');
const typeTuteur = require('./routes/typeTuteurs');
const enfant = require('./routes/enfant');
const frais = require('./routes/frais');
const tuteur = require('./routes/tuteur');
const employeur = require('./routes/employeur');
const contrat = require('./routes/contrat');
const presencetheo = require('./routes/presenceTheorique');
const presencereelle = require('./routes/presenceReelle');
const post = require('./routes/post');
const files = require('./routes/files');
const mail = require('./routes/mail');
const typejour = require('./routes/typeJour');
const facture = require('./routes/facture');
const pdfCreator = require('./routes/pdf_generator');


// use it before all view definitions
app.use(cors({origin: '*'}))
app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client/dist')));
app.use('/static', express.static(__dirname + '/public'));
app.use(fileUpload());

const unlessPath = ['/api/employeurs/login', '/api/assmats/login',
    '/api/posts/all', '/api/posts/', '/api/assmats/register', '/api/pdf/create' ,'/favicon.ico']
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
app.use('/api/typeJour', typejour);
app.use('/api/employeurs', employeur);
app.use('/api/contrat', contrat);
app.use('/api/presencetheo', presencetheo);
app.use('/api/presencereelle', presencereelle);
app.use('/api/employeurs', employeur);
app.use('/api/contrat', contrat);
app.use('/api/presencetheo', presencetheo);
app.use('/api/posts', post);
app.use('/api/files', files);
app.use('/api/factures', facture);
app.use('/api/pdf', pdfCreator);


// verifie le token dans le header sauf pour les routes dans unless
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const chat = io
    .of('/api/post')
    .on('connection', function (socket) {
        console.log('Nouveau client')
        socket.on('nouveauPost', function (data) {
            socket.broadcast.emit('nouveauPost', data)
        })

        socket.on('suppressionPost', function (data){
            socket.broadcast.emit('suppressionPost', data)
        })
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
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