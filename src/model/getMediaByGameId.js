const db = require('./dataConnect.js');

const getMediaByGameId = (gameId) => {
    const sql = `
        SELECT *
        FROM media
        WHERE media.mediaId IN (
            SELECT media_in_game.mediaId
            FROM media_in_game
            WHERE gameId = ?
        )`;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [gameId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports ={ getMediaByGameId };