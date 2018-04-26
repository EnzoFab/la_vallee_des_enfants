let client = require('../config/db')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

class Parent {
    static findOne(cb) {
        client.query('SELECT * FROM public."Parent" P, public."Disposer" D, public."Compte" C WHERE P.id_parent=D.id_parent AND D.id_compte=C.id_compte AND P.mail= ?', [email], (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                cb(res.rows)
            }
        })
    }
}

module.exports = Parent
