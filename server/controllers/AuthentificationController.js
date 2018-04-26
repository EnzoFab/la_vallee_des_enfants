let Parent = require('../models/parent')

module.exports = {
    login (req, res) {
        try {
            const parent = Parent.create(req.body)
            res.send(parent.toJSON())
        } catch(err) {
            res.status(400).send({
                error: 'ça bugue sa mère'
            })
        }
    }
}