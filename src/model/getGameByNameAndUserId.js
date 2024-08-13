const db = require('./dataConnect.js');

const getGameByNameAndUserId = (gameName, userId) => {
    const sql = 'SELECT * FROM games WHERE gameName = ? AND userId = ?';
    
    return new Promise((resolve, reject) => {
        db.query(sql, [gameName, userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};

module.exports = {getGameByNameAndUserId};