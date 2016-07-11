var express = require('express')
var app = express()
var jsonParser = require('body-parser').json();
var request = require('request');
var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 5000));
//var profiles = require('./profiles.js')
var cookieParser = require('cookie-parser')();

app.use(cookieParser)

var restaurants = require('./restaurants.js');
app.use('/restaurants', restaurants);

var user = require('./routes/user.js');
app.use('/user', user);

var login = require('./routes/login.js');
app.use('/login', login);

var session = require('./routes/session.js');
app.use('/session', session)

var meals = require('./meals.js');
app.use('/meals', meals);

var mealVotes = require('./routes/mealsUpdated.js');
app.use('/mealVotes', mealVotes);

app.use(jsonParser);
app.use(express.static('./public'));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
