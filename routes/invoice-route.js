const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/', function(req, res){  
        // 'SELECT Sales.order_number AS order_number, CONCAT(Members.member_id, " -- ", Members.member_name) AS member_id_name, CONCAT(Employees.employee_id, " -- ", Employees.employee_name) AS employee_id_name, CONCAT(Products.product_id, " -- ", Products.product_name) AS product_id_name, SalesDetails.quantity AS quantity, Sales.invoice_total AS invoice_total, CASE WHEN SalesDetails.order_type = 0 THEN CONCAT(SalesDetails.order_type, " -- ", "In Person") ELSE CONCAT(SalesDetails.order_type, " -- ", "Online") AS order_type_name, Sales.purchase_date AS purchase_date FROM SalesDetails JOIN Sales ON Sales.order_numer = SalesDetails.order_number LEFT JOIN Employees ON Sales.employee_id = Employees.employee_id JOIN Members ON Sales.member_id = Members.member_id JOIN Products ON Products.product_id = SalesDetails.product_id ORDER BY Sales.order_number;'
        const query = `SELECT
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
        JOIN Sales s ON sd.order_number = s.order_number
        JOIN Members m ON s.member_id = m.member_id
        JOIN Employees e ON s.employee_id = e.employee_id
        JOIN Products p ON sd.product_id = p.product_id
        ORDER BY s.order_number;`
        
        db.connection.query(query, function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });