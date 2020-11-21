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
SELECT *
FROM grouptwentythree.Algotrader A, grouptwentythree.Authorizes AZ, grouptwentythree.Order O, grouptwentythree.Brokerage B, grouptwentythree.Submits S
WHERE A.id = AZ.aid AND AZ.bid = B.id AND B.id = S.bid AND S.order_id = O.order_id
*/

router.get("/insert", (req, res) => {
    let item = {
      name: 'Yuzu Tech', 
      general_parameters: 'big boy quant',
      performance_metrics: 'yolo calls on TSLA only'
    }
    let sql = 'INSERT INTO Algotrader SET ?';
    connection.query(sql, item, (err, result)=>{
      if(err) throw err;
      console.log(result);
      res.send('Algotrader added! Thank you')
  })
})






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


