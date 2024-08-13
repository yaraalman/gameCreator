const db = require('./dataConnect.js');

const deleteElementsByGameId = (gameId) => {
    const sql = `
        DELETE FROM element_in_game WHERE gameId = ?`;

    return new Promise((resolve, reject) => {
        db.query(sql, [gameId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {deleteElementsByGameId};