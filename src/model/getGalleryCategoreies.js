const db = require('./dataConnect.js');

const getGalleryCategoreies = () => {
    const sql = `
        SELECT *
        FROM category
        WHERE categoryId != 1 `;

return new Promise((resolve, reject) => {
    db.query(sql , (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});
};

module.exports ={ getGalleryCategoreies };

