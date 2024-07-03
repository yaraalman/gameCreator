const mysql = require('mysql');

// התחברות למסד נתונים
const db = mysql.createConnection({
    host: 'localhost', // שם המארח של מסד הנתונים 
    user: 'root', // משתמש MySQL
    password: "", // סיסמת MySQL
    database: 'gamecreator-db' // שם מסד הנתונים שבו תרצה להתחבר
});

// בדיקת התחברות למסד הנתונים
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

module.exports = db;