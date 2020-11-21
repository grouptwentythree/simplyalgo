var express = require('express');
var router = express.Router();
var connection = require('../db')


router.get("/add/:email", (req, res) => {
  let item = {
    cName: req.params.email, 
    password: req.query.password
  }
  let sql = 'INSERT INTO Client SET ?';
  connection.query(sql, item, (err, result)=>{
    if(err) {
      res.send("AN ERROR HAS OCCURED")
      throw err;
    }
    console.log(result);
    res.send('WELCOME TO SIMPLYALGO!')
})
})


/* GET users listing. */
router.get('/:email', (req, res) => {
  connection.query('SELECT * FROM Client WHERE cName=?', [req.params.email], (error, results, fields)=> {
    if (error) {
      console.log(error);
      res.send("uWu oopsie daisy something went wrong uwu")
    } else if (!req.query.password) {
      res.send("PLEASE ENTER A PASSWORD")
    } else if(results.length<1) {
      res.send("USER NOT FOUND")
    } else if(results[0].password === req.query.password) {
      res.send("VALID")
    } else {
      res.send("We shouldn't tell you this, but your password is incorrect.")
    }
  })
});




module.exports = router;
