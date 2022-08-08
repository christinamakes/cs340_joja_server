const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/sd', function(req, res)
    {  
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
    const queryUpdateSalesDetail = `UPDATE SalesDetails SET 
                                    product_id = ${product_id},
                                    order_number = ${order_number},
                                    quantity = ${quantity}
                                    WHERE sales_details_id = ${sales_details_id}`;

    db.connection.query(queryUpdateSalesDetail, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error, req.body);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;