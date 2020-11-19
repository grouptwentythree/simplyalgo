var express = require('express');
var router = express.Router();
var connection = require('../db')


// return all algotraders
router.get("/", (req, res)=>{
  connection.query('SELECT * FROM Algotrader', (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})

// return specific algotrader
router.get("/:id", (req, res)=>{
  connection.query('SELECT * FROM Algotrader WHERE aid = ?', [req.params.id], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})

/* 
let item = {
  name: 'yungWallStreetBets', 
  general_paremeters: "some general paramters", 
  performance_metrics: "performance metrics",
  //date: ""
}
let sql = 'INSERT INTO Algotrader SET ?';
connection.query(sql, item, (err, result)=>{
  if(err) throw err;
  console.log(result);
  res.send('Algotrader added! Thank you')
})
*/


// get an algotrader  


// delete an algotrader 
router.delete("/algotrader/:id", (req, res)=>{
  connection.query('DELETE FROM Algotrader WHERE aid = ?', [req.params.id], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})

module.exports = router;


