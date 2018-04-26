let client = require('../config/db')

class AssMat {
    static connexion(cb) {
        client.query('SELECT * FROM message', (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                cb(res.rows)
            }
        })
    }
}

module.exports = AssMat

