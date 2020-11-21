var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var clientRouter = require('./routes/client');
var testAPIRouter = require('./routes/testAPI');
var algotraderRouter = require('./routes/algotrader')

var cors = require('cors');
var app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connection = require('./db')

// app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/testAPI', testAPIRouter);
app.use('/algotrader', algotraderRouter)


// adding an algotrader

app.get("/:id", (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    res.send(req.params)
    //res.send(req.params.id)
    // res.render({ title: 'Express' });
  });
})

app.get('/createalgotradertable', (req, res) => {
  let sql = 'CREATE TABLE Algotrader(id int AUTO_INCREMENT, created_date DATETIME, fee FLOAT(8) DEFAULT 0, name VARCHAR(50), general_parameters TEXT, performance_metrics TEXT, PRIMARY KEY(id))';    
  connection.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send("Algotrader Table Created!");
  })
})

// SELECT aid
app.get("/algotrader/:id", (req, res)=>{
  connection.query('SELECT * FROM Algotrader WHERE aid = ?', [req.params.id], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//connection.end();

module.exports = app;
