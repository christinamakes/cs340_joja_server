const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

// GET MEMBER_ACHIEVEMENT
router.get('/', function (req, res) {
    const query = `SELECT 
        m.member_id,
        m.member_name, 
        a.achievement_id,
        a.achievement_title
   FROM Mem_Achieve_Details s
   JOIN Members m on m.member_id = s.member_id
   JOIN Achievements a on a.achievement_id = s.achievement_id`
    db.connection.query(query, function (error, results, fields) {
        res.send(JSON.stringify(results));
    })
});

// ADD MEMBER_ACHIEVEMENT
router.post('/add', function (req, res) {
    const data = req.body;
    query1 = `INSERT INTO Mem_Achieve_Details(member_id,achievement_id) VALUES ('${data.member_id}','${data.achievement_id}')`;
    db.connection.query(query1, function (err, rows, fields) {
        if (err) {
            console.log(err)
            res.sendStatus(400);
        } else {
            query2 = `SELECT * FROM Mem_Achieve_Details;`;
            db.connection.query(query2, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    res.send(JSON.stringify(rows));
                }
            })
        }
    })
});

// DELETE MEMBER_ACHIEVEMENT
router.delete('/delete/:id', function (req, res, next) {
    const member_id = req.params.id;
    const deleteMember = `DELETE FROM Mem_Achieve_Details WHERE member_id = ?`;

    db.connection.query(deleteMember, member_id, function (error, rows, fields) {
        if (error) {
            res.sendStatus(400);
        } else {
            res.sendStatus(200)
        }
    })
});


module.exports = router