const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/', function(req, res)
    {  
        db.connection.query('SELECT * FROM Achievements;', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });

// ADD ACHIEVMENT
router.post('/add',function(req,res)
{
    let data = req.body;
    query1 = `INSERT INTO Achievements(achievement_title, achievement_criteria) VALUES ('${data.achievement_title}','${data.achievement_criteria}')`;
    db.connection.query(query1, function(err,rows,fields){
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Achievements;`;
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

// DELETE ACHIEVEMENT
router.delete('/delete/:id', function(req,res,next){
  const ach_id = req.params.id;
  const deleteAch = `DELETE FROM Achievements WHERE achievement_id = ?`;

    db.connection.query(deleteAch, ach_id, function(error, rows, fields){
        if (error) {
        res.sendStatus(400);
        }
        else {
            res.sendStatus(200)
        }
})});

  module.exports = router