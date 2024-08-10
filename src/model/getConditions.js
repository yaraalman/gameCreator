const db = require('./dataConnect.js');

const getConditions = () => {
    
  const sql = 'SELECT * FROM conditions WHERE 1';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { getConditions };