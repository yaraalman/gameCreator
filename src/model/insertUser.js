const db = require('./dataConnect.js');
const bcrypt = require('bcrypt');

const insertUser = async  (firstName, lastName, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
        INSERT INTO users (firstName, lastName, email, password ,role) 
        VALUES (?, ?, ?, ? , 'user')`;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [firstName, lastName, email, hashedPassword], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports ={ insertUser};