const db = require('./dataConnect.js');

const getCodeShapes = () => {
    
  const sql = 'SELECT * FROM code_shapes WHERE 1';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { getCodeShapes };