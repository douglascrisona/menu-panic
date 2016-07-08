var express = require('express')
var profiles = require('./profiles.js')
var meals = express.Router();
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var trackingId = require('./trackingId.js')
var session = require('./session.js');
var userSessions = require('./user-sessions.js')

meals.use(jsonParser)


// Temporary meal data object
var mealOptions = {
  poster: 'Abe',
    selection: [],
    votes: {}
}


var theMeals = []
meals.post('/', function(req, res) {
 theMeals.push(req.body)
 theMeals.forEach(function(items) {

   items.forEach(function(dish) {
     mealOptions.selection.push(dish.dish)
     mealOptions.poster = dish.name
   })
 })
res.send(mealOptions)

})

meals.get('/', function(req, res) {
  console.log(mealOptions)
  res.send(mealOptions)
})



module.exports = meals;
