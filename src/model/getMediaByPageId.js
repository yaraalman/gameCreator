const db = require('./dataConnect.js');

const getMediaByPageId = (pageId) => {
    const sql = `
        SELECT *
        FROM media
        WHERE media.mediaId IN (
            SELECT media_in_pages.mediaId
            FROM media_in_pages
            WHERE pageId = ?
        )`;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [pageId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports ={ getMediaByPageId};