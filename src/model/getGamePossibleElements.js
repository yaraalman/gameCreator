const db = require('./dataConnect.js');

const getGamePossibleElements = () => {
    const sql = `
        SELECT *
        FROM media
        WHERE categoryId != 1 AND categoryId != 2`;

return new Promise((resolve, reject) => {
    db.query(sql , (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});
};

module.exports ={ getGamePossibleElements };

