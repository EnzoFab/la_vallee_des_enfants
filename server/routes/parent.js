var express = require('express');
var router = express.Router();
let Parent = require('../models/parent')
const AuthentificationController = require('./controllers/AuthentificationController')

router.post('/login', AuthentificationController.login)

module.exports = router;