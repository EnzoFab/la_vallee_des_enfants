const express = require('express');
const router = express.Router();
const modelContact = require('../models/contact');

router.get('/all', function (req, res) {
    modelContact.selectAll(retour => {
        res.send(retour)
    })
});

router.post('/create', function (req, res) {
    let contact = req.body;
    contact.date_envoi = new Date(contact.date_envoi)
   modelContact.insert(contact, retour => {
       res.send(retour)
   });
});

router.delete('/delete/:n', function (req, res) {
   modelContact.delete(req.params.n, retour => {
       res.send(retour)
   })
});

router.put('/update/:n', function (req, res) {
    modelContact.update(req.params.n, retour => {
        res.send(retour)
    })
})
module.exports = router;