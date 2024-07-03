const db = require('./dataConnect.js');

const getUsers = () => {
    
  const sql = 'SELECT * FROM users';

  return new Promise ( (resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });

  });

};

module.exports = {getUsers};