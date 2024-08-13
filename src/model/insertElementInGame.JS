const db = require('./dataConnect.js');

const insertElementInGame = (gameId, mediaId, mediaPos, draggable ,display,  codeShapes, extraContent ='') => {
    const sql = `
        INSERT INTO element_in_game (gameId, mediaId, mediaPos , draggable ,display, codeShapes, extraContent) 
        VALUES (?, ?, ?, ?, ?, ? ,?)`;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [gameId, mediaId, mediaPos,draggable ,display, codeShapes, extraContent], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {insertElementInGame};