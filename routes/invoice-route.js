const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/', function(req, res){  
        const query = `SELECT
            s.order_number,
            m.member_id,
            m.member_name,
            e.employee_id,
            e.employee_name,
            p.product_id,
            p.product_name,
            p.product_price,
            sd.quantity,
            s.invoice_total,
            sd.order_type,
            s.purchase_date
        FROM SalesDetails sd
        RIGHT JOIN Sales s ON sd.order_number = s.order_number
        JOIN Members m ON s.member_id = m.member_id
        LEFT JOIN Employees e ON s.employee_id = e.employee_id
        JOIN Products p ON sd.product_id = p.product_id
        ORDER BY s.order_number;`
        
        db.connection.query(query, function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });

module.exports = router;