// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')
const dbConfig = require("../.env");

const connection = mysql.createPool({
    host: dbConfig.DBHOST,
    user: dbConfig.DBUSER,
    password: dbConfig.DBPASSWORD,
    database: dbConfig.DBDATABASE
  });

// Export it for use in our applicaiton
module.exports.connection = connection;