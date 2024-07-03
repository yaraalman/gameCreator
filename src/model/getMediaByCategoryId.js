const db = require('./dataConnect.js');

const getMediaByCategoryId = (categoryId) => {
    const sql = `
        SELECT *
        FROM media
        WHERE categoryId = ?`;

return new Promise((resolve, reject) => {
    db.query(sql, [categoryId], (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});
};

module.exports ={ getMediaByCategoryId };

