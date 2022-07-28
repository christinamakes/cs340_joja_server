// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bababd8c3b3f10',
    password: 'f11ae7e8',
    database: 'heroku_f2cbdce723a87d9'
  });
  // open the MySQL connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
// Export it for use in our applicaiton
module.exports.connection = connection;