const db = require('./dataConnect.js');

const getGameById = (gameId) => {
    const sql = 'SELECT * FROM games WHERE gameId = ?';
    
    return new Promise((resolve, reject) => {
        db.query(sql, [gameId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};

module.exports = { getGameById };