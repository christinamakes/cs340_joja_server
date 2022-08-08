// CITATION
// ADAPTED FROM:
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Database
const db = require('./database/db-connector')
const members = require('./routes/member-router')
const memAch = require('./routes/mem-achieve-router')
const products = require(`./routes/product-router`)
const employees = require(`./routes/employee-router`)
const seasons = require(`./routes/seasons-router`)
const achievements = require('./routes/achievements-router')
const sales = require('./routes/sales-router')
const salesDetails = require('./routes/sales-details-router')

/*
    SETUP
*/
const express = require('express');
const cors = require('cors');
const app     = express();
PORT        = process.env.PORT || 9124;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
/*
    ROUTES
*/
// MEMBERS
app.use('/members', members)
// MEMBER ACHIEVEMENT
app.use('/member-achievements', memAch)
// ACHIEVEMENTS
app.use('/achievements', achievements)
// EMPLOYEES
app.use('/employees', employees)
// PRODUCTS
app.use('/products', products)
// SEASONS
app.use('/seasons', seasons)
// SALES
app.use('/sales', sales)
// SALES DETAILS
app.use('/sales-details', salesDetails)


app.listen(PORT, function(){
});