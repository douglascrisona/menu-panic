var express = require('express')
var app = express()
var jsonParser = require('body-parser').json();
var cookieParser = require('cookie-parser')();
var request = require('request');
var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 5000));

app.use(cookieParser)

var restaurants = require('./routes/restaurants.js');
app.use('/restaurants', restaurants);

var user = require('./routes/user.js');
app.use('/user', user);

var login = require('./routes/login.js');
app.use('/login', login);

var session = require('./routes/session.js');
app.use('/session', session)

var mealVotes = require('./routes/mealsUpdated.js');
app.use('/mealVotes', mealVotes);

app.use(jsonParser);
app.use(express.static('./public'));



app.listen(app.get('port'), function() {
  console.log('Menu Panic is running on port', app.get('port'));
});
