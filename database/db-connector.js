// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b2887cec102926',
    password: 'dcf8abfe',
    database: '/heroku_dbdb373db7b79f6'
  });
  // open the MySQL connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
// Export it for use in our applicaiton
module.exports = connection;