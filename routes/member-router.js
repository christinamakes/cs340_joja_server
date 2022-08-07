const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/', function (req, res) {
    db.connection.query('SELECT * FROM Members;', function (error, results, fields) {
        res.send(JSON.stringify(results));
    })
});

// SEARCH MEMBER

// Citation for the following query:
// Date: 07/2022
// Adapted from:
// Source URL: https://stackoverflow.com/questions/58711245/how-to-build-a-search-bar-using-nodejs-and-sql-as-the-database
router.get('/search', function (req, res) {
    db.connection.query(`SELECT * FROM Members WHERE member_id LIKE "${req.query.q}%"`, function (req, results, err) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            console.log(JSON.stringify(rows[0]));
        }
    })
})



// ADD MEMBER
router.post('/add', function (req, res) {
    let data = req.body;
    query1 = `INSERT INTO Members(member_name, member_email, member_address, member_phone_number) VALUES ('${data.member_name}','${data.member_email}','${data.member_address}','${data.member_phone_number}')`;
    db.connection.query(query1, function (err, rows, fields) {
        if (err) {
            console.log(err)
            res.sendStatus(400);
        } else {
            query2 = `SELECT * FROM Members;`;
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

// DELETE MEMBER
router.delete('/delete/:id', function (req, res, next) {
    const member_id = req.params.id;
    const deleteMember = `DELETE FROM Members WHERE member_id = ?`;

    db.connection.query(deleteMember, member_id, function (error, rows, fields) {
        if (error) {
            res.sendStatus(400);
        } else {
            res.sendStatus(200)
        }
    })
});

// UPDATE MEMBER
router.put('/update', function (req, res, next) {
    const data = req.body;
    const member_id = parseInt(req.body.member_id);
    const name = req.body.member_name;
    const address = req.body.member_address;
    const email = req.body.member_email;
    const phone_number = req.body.member_phone_number;
    const queryUpdateMember = `UPDATE Members SET ? WHERE member_id = ?`;

    // Run the 1st query
    db.connection.query(queryUpdateMember, [{
        member_name: name,
        member_address: address,
        member_email: email,
        member_phone_number: phone_number
    }, member_id], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    })
});


module.exports = router