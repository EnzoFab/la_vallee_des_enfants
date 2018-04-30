var express = require('express');
var router = express.Router();

// Express middlewares
const AuthentificationController = require('../controllers/AuthentificationController')
const AuthentificationControllerPolicy = require('../policies/AuthentificationControllerPolicy')

router.post('/login',
   // AuthentificationControllerPolicy.login,
    AuthentificationController.loginParent)


module.exports = router;