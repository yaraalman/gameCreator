const db = require('./dataConnect.js');

const getGamesByUserId = (userId) => {
    const sql = `
        SELECT *
        FROM games
        WHERE userId = ?`;

return new Promise((resolve, reject) => {
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});
};

module.exports ={ getGamesByUserId };

