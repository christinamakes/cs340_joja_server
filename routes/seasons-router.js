const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/', function(req, res)
    {  
        db.connection.query('SELECT * FROM Seasons;', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });

// ADD SEASON
router.post('/add',function(req,res)
{
    let data = req.body;
    query1 = `INSERT INTO Seasons(season_code, description) VALUES ('${data.season_code}','${data.description}')`;
    db.connection.query(query1, function(err,rows,fields){
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Seasons;`;
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
});

  module.exports = router