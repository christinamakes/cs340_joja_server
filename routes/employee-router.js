const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/', function(req, res)
    {  
        db.connection.query('SELECT * FROM Employees;', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });
// Citation for the following query:
// Date: 07/2022
// Adapted from:
// Source URL: https://stackoverflow.com/questions/58711245/how-to-build-a-search-bar-using-nodejs-and-sql-as-the-database
router.get('/search', function (req, res) {
    const search = req.query.q
    const query = `SELECT * FROM Employees WHERE (employee_id LIKE '%${search}%' OR employee_name LIKE '%${search}%' OR employee_email LIKE '%${search}%' OR employee_phone_number LIKE '%${search}%' OR employee_hourly_wage LIKE '%${search}%')`
    db.connection.query(query, function (error, results, fields) {
        res.send(JSON.stringify(results));
    })
});

// ADD EMPLOYEE
router.post('/add',function(req,res)
{
    let data = req.body;
    query1 = `INSERT INTO Employees(employee_name, employee_email, employee_phone_number, employee_hourly_wage) VALUES ('${data.employee_name}','${data.employee_email}','${data.employee_phone_number}','${data.employee_hourly_wage}')`;
    db.connection.query(query1, function(err,rows,fields){
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Employees;`;
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

// DELETE EMPLOYEE
router.delete('/delete/:id', function(req,res,next){
  const employee_id = req.params.id;
  const deleteEmployee = `DELETE FROM Employees WHERE employee_id = ?`;

    db.connection.query(deleteEmployee, employee_id, function(error, rows, fields){
        if (error) {
        res.sendStatus(400);
        }
        else {
            res.sendStatus(200)
        }
})});

// UPDATE EMPLOYEE
router.put('/update', function(req,res,next){
    const data = req.body;
    const employee_id = parseInt(req.body.employee_id);
    const name = req.body.employee_name;
    const email = req.body.employee_email;
    const phone_number = req.body.employee_phone_number;
    const hourly_wage = req.body.employee_hourly_wage;
    const queryUpdateEmployee = `UPDATE Employees SET ? WHERE employee_id = ?`;

          // Run the 1st query
          db.connection.query(queryUpdateEmployee, [{employee_name:name,employee_email:email,employee_phone_number:phone_number,employee_hourly_wage:hourly_wage},employee_id], function(error, rows, fields){
              if (error) {
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                  res.sendStatus(200);
              }
  })});


  module.exports = router