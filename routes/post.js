var express = require('express');
var router = express.Router();
const modelPost = require('../models/post');

router.get('/all', function (req, res, next) {
    modelPost.getAll(function (retour) {
        res.send(retour);
    });
});

router.post('/create', function (req, res, next) {
    var post = req.body.post
    modelPost.create(post, function (retour) {
        res.send(retour)
    })
});

router.delete('/delete', function (req, res, next) {
    var id = req.body.idPost
    modelPost.delete(idPost, function (retour) {
        res.send(retour)
    })
});

router.get('/',function(req, res, next) {
    // route pour le socket io
    console.log("yete")
    req.io.sockets.on('connection',function (socket) {
        console.log('un client');
    })
});

module.exports = router;