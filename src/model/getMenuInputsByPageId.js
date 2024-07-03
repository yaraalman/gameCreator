const db = require('./dataConnect.js');

const getMenuInputsByPageId = (pageId,inputType) => {
    const sql = `
        SELECT DISTINCT *
        FROM inputs i
        INNER JOIN  menus_inputs mi ON i.inputId = mi.inputId
        INNER JOIN  pages_menus pm ON mi.menuId = pm.menuId
        WHERE  pm.pageId =? AND i.inputType LIKE ? `;
    
    return new Promise((resolve, reject) => {
        db.query(sql, [pageId,inputType], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports ={ getMenuInputsByPageId };