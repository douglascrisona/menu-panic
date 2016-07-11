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
 console.log(meals)
});

// Add a new meal to vote on.
mealVotes.post('/', function(req, res) {
 var theMeal = {};
 theMeal.id = id.id()
 theMeal.poster = req.body.poster
 theMeal.options = [];
 theMeal.options.push(req.body.dishes[0])
 theMeal.options.push(req.body.dishes[1])
 theMeal.options.push(req.body.dishes[2])
 theMeal.voters = [];
 theMeal.voters.push(req.body.voters)
 meals.data.push(theMeal);

 res.send(meals)
});


// Vote on an existing meal.
mealVotes.put('/vote/:id/:option', function(req, res) {
 //...they haven't already voted
 var voted = false;
 meals.data.forEach(function(meal) {
   if (meal.id == req.params.id) {
     meal.voters.forEach(function(voter) {
       if (voter.name == session.getName()) {
         voted = true;
       }
     });
   }
 });

 if (!voted) {
   //... find the correct meal
   meals.data.forEach(function(meal) {
     if (meal.id == req.params.id) {
       var name = session.getName();
       var option = req.params.option;
       meal.voters.push( { name: name, option });
     }
   });
 }
});

module.exports = mealVotes;
