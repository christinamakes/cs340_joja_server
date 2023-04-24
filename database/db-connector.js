// ./database/db-connector.js

// Get an instance of mysql we can use in the app
const mysql = require('mysql')

const connection = mysql.createPool('mysql://root:BH8KYMI7flbKT0EBnxEi@containers-us-west-24.railway.app:6605/railway');

// Export it for use in our applicaiton
module.exports.connection = connection;