'use strict';

const express = require('express');
const handleBars = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Rounting = require('./routes/routing');
const Pool = pg.Pool;

const app = express();

app.engine('handlebars', handleBars({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));

// should we use a SSL connection
let useSSL = false;
// let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder@localhost:5432/user_table';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

const routes = Rounting(pool);

// grant all privileges on database my_products to coder;
 
app.get('/user/:username/dashboard', routes.dashboard);
app.post('/story/add/:username', routes.addStory);
app.post('/story/:id/make_public/:username', routes.makeStoryPublic);

// show a users dashboard. Allow user to add stories & to see all there stories and to make some stories public
app.get('/stories/:username', routes.getStories);
app.get('/shelters',routes.findShelters)
app.get('/shelters/filter/:search', routes.filterShelters)

app.get('/', function(req, res) {
  res.render('login', {layout : 'login'});
});

app.get('/statistics', function(req, res) {
  res.render('statistics');
});

app.post('/login', function(req, res) {
  let username = req.body.username;
  res.redirect(`/user/${username}/dashboard`);
});

// app.get('/statistics', routes.statistics);
// app.post('/getHelp', routes.getHelp);
// app.get('/shelters',routes.shelters);
// app.get('/chat',routes.chattRoom);
// app.get('/chat/dashboard',routes.chatRoomDashboard);

const PORT = process.env.PORT || 2018;
app.listen(PORT, function () {
  console.log('Listening to port.... ' + PORT);
});