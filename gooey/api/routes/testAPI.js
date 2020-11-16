var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'admin',
    host: 'grouptwentythree.crac00bj6kog.us-west-2.rds.amazonaws.com',
    database: 'grouptwentythree',
    password: 'password',
    port: 3306,
})

router.get('/', (req, res) => {
    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
      });
    res.send('API is working properly');

});

module.exports = router;