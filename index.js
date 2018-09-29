'use strict';

const express = require('express');
const handleBars = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Rounting = require('./routes/routing');
const Pool = pg.Pool;

const app = express();

app.engine('handlebars', handleBars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));
  // initialise the flash middleware
app.use(flash());

app.use(express.static('public'));

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/rejuvunateDB';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

const routes = Rounting();

  function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
    }


app.get('/', routes.home);
app.get('/login', routes.loginPage);

const PORT = 2018;
app.listen(PORT, function () {
  console.log('Listening to port.... '+PORT);
});