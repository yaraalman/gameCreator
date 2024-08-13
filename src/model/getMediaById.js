const db = require('./dataConnect.js');

const getMediaById  = (mediaId) => { 
    const sql = 'SELECT * FROM media WHERE mediaId = ?';
    
    return new Promise((resolve, reject) => {
        db.query(sql, [mediaId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};

module.exports ={ getMediaById  };