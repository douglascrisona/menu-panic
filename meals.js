var express = require('express')
var profiles = require('./profiles.js')
var meals = express.Router();
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var trackingId = require('./trackingId.js')
var session = require('./session.js');
var userSessions = require('./user-sessions.js')

meals.use(jsonParser)
/**
var mealOptions = {
  poster: 'Abe',
    selection: {
      dishes: { dish: 'Pizza'},
      second: { dish: 'Hamburger' }
    },
  poster: 'John',
    selection: {
      first: { dish: 'Spaghetti'},
      second: { dish: 'Rigatoni' },
    }
}
**/




var mealOptions = {
  poster: 'Abe',
    selection: {
      first: { dish: 'Pizza' },
      second: { dish: 'Burger'}
    }
}

var theMeals = []

meals.post('/', function(req, res) {
 //console.log(mealOptions)
 //console.log(mealOptions.selection.first.dish)
 theMeals.push(req.body)
 //console.log(theMeals)
 theMeals.forEach(function(items) {

   //console.log(items)
   items.forEach(function(dishes) {
     mealOptions.selection.first = dishes.first;
     mealOptions.selection.second = dishes.second;
     mealOptions.selection.third = dishes.third;
     mealOptions.selection.fourth = dishes.fourth;
     mealOptions.selection.fifth = dishes.fifth;
     mealOptions.poster = dishes.name;
   })
 })

 /**
 theMeals.forEach(function(item) {
   console.log(item)
   mealOptions.poster = item.name;
   mealOptions.selection.first.dish = item.primary
   mealOptions.selection.first.dish = item.secondary
   //console.log(mealOptions.poster)


 })
    **/
 console.log(mealOptions)



/**
  //console.log(req.body)
  theMeals.push(req.body)
  //console.log(theMeals)
  theMeals.forEach(function(dish){
    //console.log(dish)
    dish.forEach(function(item) {
      //console.log(item)
      mealOptions.poster = item.name


    })

  })

  //mealOptions.poster = req.body.poster;
  //mealOptions.selection.first = req.body.dish1;
  //mealOptions.selection.second = req.body.dish2;
  //console.log(mealOptions)
  console.log(mealOptions)
**/
  res.send(theMeals)
})



module.exports = meals;
