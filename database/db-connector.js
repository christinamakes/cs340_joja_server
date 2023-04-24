// ./database/db-connector.js
require('dotenv').config()

// Get an instance of mysql we can use in the app
const mysql = require('mysql')

console.log(process.env.DBDATABASE)

const connection = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
  });

// Export it for use in our applicaiton
module.exports.connection = connection;