// App.js

// Database
var db = require('./database/db-connector')

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = process.env.PORT || 9124;                 // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        // Define our queries
        query1 = 'SELECT * FROM Members';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        db.connection.query(query1, function (err, results, fields){

            
                        // Send the results to the browser
                        res.send(JSON.stringify(results));
                    });
                });
                                     // requesting the web site.

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});