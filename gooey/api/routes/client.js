var express = require('express');
var router = express.Router();
var connection = require('../db')

/* GET users listing. */
router.get('/:email', function(req, res) {
  connection.query('SELECT * FROM Client WHERE name=?', [req.params.email], (error, results, fields)=> {
    if (error) {
      console.log(error);
      res.send("uWu oopsie daisy something went wrong uwu")
    }
    if(results.length<1) {
      res.send("USER NOT FOUND")
    }
    if(results[0].password === req.query.password) {
      res.send("VALID")
    } else {
      res.send("We shouldn't tell you this, but your password is incorrect.")
    }
  })
});

  // lets query the db 
  // res.send(req.query.password)
  // and send a validated request! 
  //res.send(req.params);


module.exports = router;
