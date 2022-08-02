// App.js

// Database
const db = require('./database/db-connector')
const members = require('./routes/member-router')

/*
    SETUP
*/
const express = require('express');
const cors = require('cors');
const app     = express();
PORT        = process.env.PORT || 9124;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
/*
    ROUTES
*/
// MEMBERS
app.use('/members', members)


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});