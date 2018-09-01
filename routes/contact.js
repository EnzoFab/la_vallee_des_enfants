const express = require('express');
const router = express.Router();
const modelContact = require('../models/contact');

router.get('/all', function (req, res) {
    modelContact.selectAll(res.send)
});

router.post('/create', function (req, res) {
    let contact = {};
   modelContact.insert(contact, res.send);
});

router.delete('/delete/:n', function (req, res) {
   modelContact.delete(req.params.n, res.send)
});
module.exports = router;