// App.js

// Database
const db = require('./database/db-connector')

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
// SELECT ALL
app.get('/members', function(req, res)
    {  
        db.connection.query('SELECT * FROM Members;', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });

// ADD MEMBER
app.post('/add-member',function(req,res)
{
    let data = req.body;
    query1 = `INSERT INTO Members(name,email,address,phone) VALUES ('${data.name}','${data.email}','${data.address}','${data.phone}')`;
    db.connection.query(query1, function(err,rows,fields){
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Members;`;
            db.connection.query(query2, function(err,rows,fields) {
                if(err) {
                    console.log(err);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(JSON.stringify(rows));
                }
            })
        }
    })
})
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});