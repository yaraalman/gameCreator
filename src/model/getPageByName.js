const db = require('./dataConnect.js');

const getPageByName = (pageName) => {
    
  const sql = 'SELECT * FROM pages WHERE pageName LIKE ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [pageName], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

module.exports = {getPageByName};