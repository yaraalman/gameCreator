
const db = require('./dataConnect.js');

const getFormInputsByPageId = (pageId, inputType) => {
    const sql = `
        SELECT DISTINCT *
        FROM inputs i
        INNER JOIN  forms_inputs fi ON i.inputId = fi.inputId
        INNER JOIN  pages_forms pf ON fi.formId = pf.formId
        WHERE  pf.pageId =? AND i.inputType LIKE ? `;

    return new Promise((resolve, reject) => {
        db.query(sql, [pageId, inputType], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = { getFormInputsByPageId };