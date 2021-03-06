var express = require('express');
var router = express.Router();
var connection = require('../db')


// return user algotraders
router.get("/", (req, res)=>{
  connection.query('SELECT * FROM grouptwentythree.Build BU, grouptwentythree.Algotrader A WHERE BU.cName = ? AND BU.id = A.id'
  ,[req.query.user], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})

router.get("/all", (req, res)=>{
    connection.query('SELECT * FROM Algotrader', (err, rows, fields)=>{
      if(!err) {
        res.send(rows);
      } else {
        console.log(err)
      }
  })
})


router.get("/divide", (req, res)=>{
  connection.query('SELECT * FROM Algotrader a WHERE NOT EXISTS ((SELECT b.id FROM Brokerage b WHERE NOT EXISTS (SELECT ab.aid FROM Authorizes ab WHERE ab.aid = b.id AND ab.bid = a.id)))', (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})
//selection
//Algotrader that has a fee<=1
router.get("/popular_algotrader", (req, res)=>{
  connection.query('SELECT * FROM grouptwentythree.Algotrader A WHERE A.fee<=1', (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})

//aggregation+group by
//algotrader clints have used
//SELECT A.name, COUNT() FROM grouptwentythree.Algotrader A, grouptwentythree.Build B WHERE A.id = B.id GROUP BY A.name ;
router.get("/popular_algotrader", (req, res)=>{
  connection.query('SELECT * FROM grouptwentythree.Algotrader A, grouptwentythree.Build B WHERE A.id = B.id GROUP BY A.name HAVING COUNT() > 1', (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})
//aggregation+having
//popular algotrader (algotrader clints have used more than 1)
//SELECT A.name, COUNT() FROM grouptwentythree.Algotrader A, grouptwentythree.Build B WHERE A.id = B.id GROUP BY A.name HAVING COUNT()>1;
router.get("/popular", (req, res)=>{
  connection.query('SELECT * FROM grouptwentythree.Algotrader A, grouptwentythree.Build B WHERE A.id = B.id GROUP BY A.id HAVING COUNT(*)>1', (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})

//join
//Stock trading history of Algotraders
// return specific algotrader
router.get("/performance/:id", (req, res)=>{
  connection.query(
    'SELECT A.name,quantity, datetime, B.name, ticker, O.order_id FROM grouptwentythree.Algotrader A, grouptwentythree.Authorizes AZ, grouptwentythree.Order O, grouptwentythree.Brokerage B, grouptwentythree.Submits S WHERE A.id = ? AND A.id = AZ.aid AND AZ.bid = B.id AND B.id = S.bid AND S.order_id = O.order_id',
     [req.params.id], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})

router.get("/:id", (req, res)=>{
  connection.query('SELECT * FROM Algotrader', [req.params.id], (err, rows, fields)=>{
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


module.exports = router;


