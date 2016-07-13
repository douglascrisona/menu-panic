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
     options: [{display: 'Spaghetti & Meatballs', id: 1}, {display: 'Ribs', id: 2}],
     voters: [
       { name: 'Jose', vote: 2 },
       { name: 'Nancy', vote: 1 },
       { name: 'David', vote: 1 },
       { name: 'Abe', vote: 1 },
       { name: 'John' , vote: 1 },
     ]
   },
   {
     id: 2,
     poster: "Larry",
     options: [{display: 'Pasta Primavera', id: 1}, {display: 'Salmon', id: 2}],
     voters: [
       { name: 'Larry', vote: 1 },
       { name: 'John' , vote: 1 },
     ]
   }
 ]
}



var id = {
  id: function() {
    return Math.floor(Math.random() * 10)
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
 theMeal.options.push({display: req.body.dishes[0], id: 1})
 theMeal.options.push({display: req.body.dishes[1], id: 2})
 theMeal.options.push({display: req.body.dishes[2], id: 3})
 theMeal.voters = [];
 theMeal.voters.push(req.body.voters);
 meals.data.push(theMeal);

 res.send(meals);
});

// Vote on an existing meal.
mealVotes.put('/vote/:id/:option/:name', function(req, res) {
  var vote = {}
  meals.data.forEach(function(meal) {
    if(meal.id == req.params.id) {
      var name = req.params.name;

        meal.options.forEach(function(items){
          if(req.params.option == items.display) {
            meal.voters.forEach(function(voter) {
              vote.id = items.id
            });
            meal.voters.push( { name: name, vote: vote.id });
          }
          console.log(items.display, items.id)
        });
    }
  });
  res.send(meals)
});


mealVotes.get('/results/:poster', function(req, res) {
  meals.data.forEach(function(data) {
    data.voters.forEach(function(vote) {
      if(data.poster == req.params.poster) {
        console.log(vote.vote)
      }
    });
  });
  res.send()
});

module.exports = mealVotes;
