var express = require('express');
var router = express.Router();

router.get('/all',function(req, res, next) {
    req.io.emit('message','y a quoi')
});


router.get('/',function(req, res, next) {
    // route pour le socket io
    console.log("yete")
    req.io.sockets.on('connection',function (socket) {
        console.log('un client');
    })
});

module.exports = router;