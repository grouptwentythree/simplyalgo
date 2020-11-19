var mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'grouptwentythree',
    host: 'grouptwentythree.crac00bj6kog.us-west-2.rds.amazonaws.com',
    database: 'grouptwentythree',
    password: 'password',
    port: 3306,
  })
  
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });

  module.exports = connection;