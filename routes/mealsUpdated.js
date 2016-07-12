var express = require('express')
var profiles = require('../profiles.js')
var mealVotes = express.Router();
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var trackingId = require('../trackingId.js')
var userSessions = require('../user-sessions.js')

mealVotes.use(jsonParser)

var meals = {
 data: [
   {
     id: 1,
     poster: "John",
     options: ['Spaghetti & Meatballs', 'Ribs'],
     voters: [
       { name: 'Larry', vote: 'ribs' },
       { name: 'John' , vote: 'steak' },
     ]
   },
   {
     id: 2,
     poster: "Larry",
     options: ['Pasta Primavera', 'Salmon'],
     voters: [
       { name: 'Larry', vote: 'ribs' },
       { name: 'John' , vote: 'steak' },
     ]
   }
 ]
}


var id = {
  id: function() {
    return Math.floor(Math.random() * 1000)
  }
}

// Get a list of all current meals.
mealVotes.get('/', function(req, res) {
 res.send(meals);
 //console.log(meals)
});

// Add a new meal to vote on.
mealVotes.post('/', function(req, res) {
 var theMeal = {};
 theMeal.id = id.id()
 theMeal.poster = req.body.poster
 theMeal.options = [];
 theMeal.options.push(req.body.dishes[0]);
 theMeal.options.push(req.body.dishes[1]);
 theMeal.options.push(req.body.dishes[2]);
 theMeal.voters = [];
 theMeal.voters.push(req.body.voters);
 meals.data.push(theMeal);

 res.send(meals);
});

// Vote on an existing meal.
mealVotes.put('/vote/:id/:option/:name', function(req, res) {
var matched = { count: 0 }
  meals.data.forEach(function(meal) {
    if(meal.id == req.params.id) {
      var name = req.params.name;
      var option = req.params.option;
      meal.voters.push( { name: name, vote: option });
    }
  });
  console.log(matched)
  res.send(meals)
});



module.exports = mealVotes;
