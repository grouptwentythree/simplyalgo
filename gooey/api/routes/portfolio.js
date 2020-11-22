var express = require('express');
var router = express.Router();
var connection = require('../db')


router.get("/", (req, res)=>{
    connection.query('SELECT SUM(quantity) AS value, ticker AS title FROM grouptwentythree.Client C, grouptwentythree.Build BU, grouptwentythree.Algotrader A, grouptwentythree.Authorizes AZ, grouptwentythree.Order O, grouptwentythree.Brokerage B, grouptwentythree.Submits S WHERE C.cName = ? AND C.cName = BU.cName AND BU.id = A.id AND A.id = AZ.aid AND AZ.bid = B.id AND B.id = S.bid AND S.order_id = O.order_id GROUP BY ticker'
    ,[req.query.user], (err, rows, fields)=>{
      if(!err) {
        res.send(rows);
      } else {
        console.log(err)
      }
    })
})

module.exports = router;