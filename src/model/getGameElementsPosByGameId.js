const db = require('./dataConnect.js');

const getGameElementsPosByGameId = (gameId) => {
    const sql = 'SELECT  mediaId , mediaPos , extraContent FROM element_in_game WHERE gameId = ?';
    
    return new Promise((resolve, reject) => {
        db.query(sql, [gameId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = { getGameElementsPosByGameId };