const db = require('./dataConnect.js');
const bcrypt = require('bcrypt');

const insertUser = async  (FirstName, LastName, Email, Password) => {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const sql = `
        INSERT INTO users (firstName, lastName, email, password ,role) 
        VALUES (?, ?, ?, ? , 'user')`;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [FirstName, LastName, Email, hashedPassword], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports ={ insertUser};