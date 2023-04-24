// ./database/db-connector.js

// Get an instance of mysql we can use in the app
const mysql = require('mysql')

const connection = mysql.createConnection(process.env.MYSQL_URL);

// Export it for use in our applicaiton
module.exports.connection = connection;