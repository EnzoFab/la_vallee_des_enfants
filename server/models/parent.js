let client = require('../config/db')

class Parent {
    static existsParent(cb) {
        client.query('SELECT * FROM Parent WHERE mail= ?', [mail], (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                cb(res.rows)
            }
        })
    }
}

module.exports = Parent
