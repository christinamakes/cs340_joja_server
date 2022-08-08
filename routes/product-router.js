const express = require('express')
const router = express.Router()
const db = require('../database/db-connector')

router.get('/', function(req, res)
    {  
        db.connection.query('SELECT * FROM Products;', function(error, results, fields){
            res.send(JSON.stringify(results));
        })
    });

// SEARCH PRODUCT
// CITATION:
// Date: 07/2022
// Adapted from:
// Source URL: https://stackoverflow.com/questions/58711245/how-to-build-a-search-bar-using-nodejs-and-sql-as-the-database

router.get('/search', function (req, res) {
    const search = req.query.q
    const query = `SELECT * FROM Products WHERE (product_id LIKE '%${search}%' OR product_name LIKE '%${search}%' OR product_price LIKE '%${search}%' OR season_code LIKE '%${search}%' OR number_in_stock LIKE '%${search}%')`
    db.connection.query(query, function (error, results, fields) {
        res.send(JSON.stringify(results));
    })
});

// ADD PRODUCT
router.post('/add',function(req,res)
{
    let data = req.body;
    query1 = `INSERT INTO Products(product_name, product_price, season_code, number_in_stock) VALUES ('${data.product_name}','${data.product_price}','${data.season_code}','${data.number_in_stock}')`;
    db.connection.query(query1, function(err,rows,fields){
        if(err){
            console.log(err)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Products;`;
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

// UPDATE PRODUCT
router.put('/update', function(req,res,next){
    const data = req.body;
    const product_id = parseInt(req.body.product_id);
    const name = req.body.product_name;
    const price = req.body.product_price;
    const season_code = req.body.season_code;
    const number_in_stock = req.body.number_in_stock;
    const queryUpdateProduct = `UPDATE Products SET ? WHERE product_id = ?`;

          // Run the 1st query
          db.connection.query(queryUpdateProduct, [{product_name:name,product_price:price,season_code:season_code,number_in_stock:number_in_stock},product_id], function(error, rows, fields){
              if (error) {
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                  res.sendStatus(200);
              }
  })});

  module.exports = router