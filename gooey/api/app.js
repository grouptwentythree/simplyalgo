var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var algotraderRouter = require('./routes/algotrader')

var cors = require('cors');
var app = express();
app.use(cors());
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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


// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);


app.get("/", (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    res.send('pee pee poo poo')
    // res.render({ title: 'Express' });
  });
})

// get an algotrader  
app.get("/algotrader/:id", (req, res)=>{
  connection.query('SELECT * FROM Algotrader WHERE aid = ?', [req.params.id], (err, rows, fields)=>{
    if(!err) {
      res.send(rows);
    } else {
      console.log(err)
    }
  })
})


// delete an algotrader 
app.delete("/algotrader/:id", (req, res)=>{
  connection.query('DELETE FROM Algotrader WHERE aid = ?', [req.params.id], (err, rows, fields)=>{
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
