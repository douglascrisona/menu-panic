var express = require('express')
var profiles = require('./profiles.js')
var meals = express.Router();
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var trackingId = require('./trackingId.js')
var session = require('./session.js');
var userSessions = require('./user-sessions.js')

meals.use(jsonParser)

var pendingMeals = []

var mealOptions = {
  poster: 'Abe',
    selection: [
      { dish: 'Pizza' },
      { dish: 'Burger'}
    ]
}


var theMeals = []
meals.post('/', function(req, res) {
 //console.log(mealOptions)
 //console.log(mealOptions.selection.first.dish)
 theMeals.push(req.body)
// console.log(req.body)
 console.log(theMeals)

 //console.log(theMeals)
 theMeals.forEach(function(items) {


   //console.log(items)
   items.forEach(function(dishes) {
     //mealOptions.selection.first = dishes.first;
     //mealOptions.selection.second = dishes.second;
     //mealOptions.selection.third = dishes.third;
     //mealOptions.selection.fourth = dishes.fourth;
     //mealOptions.selection.fifth = dishes.fifth;
      mealOptions.poster = dishes.name;
      mealOptions.selection.forEach(function(item) {
        item.dish = dishes;
      })
   })

 })
//console.log(mealOptions)
res.send(mealOptions)

})

meals.get('/', function(req, res) {
  //console.log(pendingMeals)
  //console.log(mealOptions)
  //res.send(theMeals)
  res.send(mealOptions)
})



module.exports = meals;


//*******THE ORIGINAL*******//
var express = require('express')
var profiles = require('./profiles.js')
var meals = express.Router();
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var trackingId = require('./trackingId.js')
var session = require('./session.js');
var userSessions = require('./user-sessions.js')

meals.use(jsonParser)

var pendingMeals = []

var mealOptions = {
  poster: 'Abe',
    selection: [
      { dish: 'Pizza' },
      { dish: 'Burger'}
    ]
}


var theMeals = []
meals.post('/', function(req, res) {
 //console.log(mealOptions)
 //console.log(mealOptions.selection.first.dish)
 theMeals.push(req.body)
 console.log(req.body)
 //console.log(theMeals)
 theMeals.forEach(function(items) {

   //console.log(items)
   items.forEach(function(dishes) {
     //mealOptions.selection.first = dishes.first;
     //mealOptions.selection.second = dishes.second;
     //mealOptions.selection.third = dishes.third;
     //mealOptions.selection.fourth = dishes.fourth;
     //mealOptions.selection.fifth = dishes.fifth;
      mealOptions.poster = dishes.name;
      mealOptions.selection.forEach(function(item) {
        item.dish = dishes;
      })
   })

 })
pendingMeals.splice(0, 1)
pendingMeals.push(mealOptions)
//console.log(theMeals)
console.log(mealOptions)
res.send(mealOptions)

})

meals.get('/', function(req, res) {
  //console.log(pendingMeals)
  console.log(mealOptions)
  //res.send(theMeals)
  res.send(mealOptions)
})



module.exports = meals;
