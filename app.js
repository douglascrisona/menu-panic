var express = require('express')
var app = express()
var jsonParser = require('body-parser').json();
var request = require('request');
var profiles = require('./profiles.js')
var cookieParser = require('cookie-parser')();

app.use(cookieParser)

var restaurants = require('./restaurants.js');
app.use('/restaurants', restaurants);

var user = require('./user.js');
app.use('/user', user);

var login = require('./login.js');
app.use('/login', login);

var session = require('./session.js');
app.use('/session', session)

var votes = require('./votes.js');
app.use('/votes', votes);

var meals = require('./meals.js');
app.use('/meals', meals);

app.use(jsonParser);
app.use(express.static('./'))


var userID = [] // Provides user a sepcific ID for assigning selected menu items and voting
var theChoices = []



app.listen(8080);
