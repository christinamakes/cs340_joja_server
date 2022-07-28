// App.js

// Database
var db = require('./database/db-connector')

/*
    SETUP
*/
var express = require('express');
var app     = express();
PORT        = process.env.PORT || 9124;

/*
    ROUTES
*/
app.get('/', function(req, res)
    {  
        db.connection.query('SELECT * FROM Members;', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});