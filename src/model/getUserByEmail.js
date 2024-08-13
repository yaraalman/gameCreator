const db = require('./dataConnect.js');

const getUserByEmail = (email) => {
    const sql = `
        SELECT * FROM users 
        WHERE email = ?`;

    return new Promise((resolve, reject) => {
        db.query(sql, [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = { getUserByEmail };