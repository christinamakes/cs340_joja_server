const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/s', function(req, res){  
        db.connection.query('SELECT * FROM Sales;', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });
// ADD SALE
router.post('/add-s',function(req,res)
{
    let data = req.body;
    query1 = `INSERT INTO Sales(member_id, employee_id, purchase_date, invoice_total) VALUES ('${data.member_id}', NULLIF('${data.employee_id}', '0'),'${data.purchase_date}','${data.invoice_total}')`;
    db.connection.query(query1, function(err,rows,fields){
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Sales;';
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

// UPDATE SALES
router.put('/update-s', function(req,res,next){
    const data = req.body;
    const member_id = parseInt(req.body.member_id);
    let employee_id = data.employee_id;
   
    const order_number = parseInt(req.body.order_number);
    const purchase_date = req.body.purchase_date;
    const invoice_total = parseInt(req.body.invoice_total);

    const queryUpdateSale = `UPDATE Sales SET 
                            member_id = '${data.member_id}',
                            employee_id = NULLIF('${data.employee_id}', '0'),
                            purchase_date = '${purchase_date}',
                            invoice_total = '${invoice_total}' WHERE order_number = '${order_number}'`;

    const queryUpdateSale2 = `UPDATE Sales SET ? WHERE order_number = ?`;
          // Run the 1st query
    if (employee_id === null) {
        
        db.connection.query(queryUpdateSale2, [{member_id:member_id, purchase_date:purchase_date,invoice_total:invoice_total},order_number], function(error, rows, fields){
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    } else if (employee_id === '0') {
        db.connection.query(queryUpdateSale, function(error, rows, fields){
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        db.connection.query(queryUpdateSale2, [{member_id:member_id, employee_id:parseInt(employee_id),purchase_date:purchase_date,invoice_total:invoice_total},order_number], function(error, rows, fields){
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    }
});

  module.exports = router;