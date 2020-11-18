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
app.use('/algotrader', algotraderRouter)



// adding an algotrader
app.get('/addalgotrader', (req, res)=>{
  let item = {
    name: 'yungWallStreetBets', 
    general_parameters: "some general paramters", 
    performance_metrics: "performance metrics",
    //date: ""
  }
  let sql = 'INSERT INTO Algotrader SET ?';
  connection.query(sql, item, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send('Algotrader added! Thank you')
  })
})

app.get("/", (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    res.send('pee pee poo poo')
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
