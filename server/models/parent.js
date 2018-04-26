let client = require('../config/db')

class Parent {
    static connexion(cb) {
        client.query('SELECT mail FROM Parent P, Disposer D, Compte C WHERE P.id_parent=D.id_parent AND D.id_compte=C.id_compte AND P.mail= ? AND C.mot_de_passe= ? ', [mail, mdp], (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                cb(res.rows)
            }
        })
    }
}

module.exports = Parent
