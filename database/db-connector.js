// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '@us-cdbr-east-06.cleardb.net',
    user            : 'bababd8c3b3f10',
    password        : 'f11ae7e8',
    database        : '/heroku_dbdb373db7b79f6'
})

// Export it for use in our applicaiton
module.exports.pool = pool;