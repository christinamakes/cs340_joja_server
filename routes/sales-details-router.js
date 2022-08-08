const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/sd', function(req, res)
    {  
        // 'SELECT Sales.order_number AS order_number, CONCAT(Members.member_id, " -- ", Members.member_name) AS member_id_name, CONCAT(Employees.employee_id, " -- ", Employees.employee_name) AS employee_id_name, CONCAT(Products.product_id, " -- ", Products.product_name) AS product_id_name, SalesDetails.quantity AS quantity, Sales.invoice_total AS invoice_total, CASE WHEN SalesDetails.order_type = 0 THEN CONCAT(SalesDetails.order_type, " -- ", "In Person") ELSE CONCAT(SalesDetails.order_type, " -- ", "Online") AS order_type_name, Sales.purchase_date AS purchase_date FROM SalesDetails JOIN Sales ON Sales.order_numer = SalesDetails.order_number LEFT JOIN Employees ON Sales.employee_id = Employees.employee_id JOIN Members ON Sales.member_id = Members.member_id JOIN Products ON Products.product_id = SalesDetails.product_id ORDER BY Sales.order_number;'
        db.connection.query('SELECT * FROM SalesDetails;', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });

    // ADD SALES DETAIL
router.post('/add-sd',function(req,res){
    let data = req.body;
    query1 = `INSERT INTO SalesDetails(product_id, order_number, quantity, order_type) VALUES ('${data.product_id}', '${data.order_number}','${data.quantity}','${data.order_type}')`;
    db.connection.query(query1, function(err,rows,fields){
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM SalesDetails;';
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

router.put('/update-sd', function(req,res){
    const data = req.body;
    const sales_details_id = parseInt(req.body.sales_details_id);
    const product_id = parseInt(req.body.product_id);
    const order_number = parseInt(req.body.order_number);
    const quantity = parseInt(req.body.quantity);
    const queryUpdateSalesDetail = `UPDATE SalesDetails SET ? WHERE sales_details_id = ?`;

    db.connection.query(queryUpdateSalesDetail, [{product_id:product_id,order_number:order_number,quantity:quantity,order_type:order_type},sales_details_id], function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;