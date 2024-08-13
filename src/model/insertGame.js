const db = require('./dataConnect.js');

const insertGame = (userId , gameName) => {
    const sql = `
        INSERT INTO games (userId, gameName ) 
        VALUES (?, ?)`;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [userId , gameName], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = { insertGame};