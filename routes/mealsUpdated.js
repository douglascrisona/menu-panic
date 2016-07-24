var express = require('express')
var profiles = require('../profiles.js')
var mealVotes = express.Router();
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var trackingId = require('../trackingId.js');
var userSessions = require('../user-sessions.js');
var client = require('twilio')('ACade02b2b721da17f3c9f02b627d3e3a4', '06af81eed7d85f7a60f59f18f6bacc11');

mealVotes.use(jsonParser)

var meals = {
 data: [
   {
     id: 1,
     poster: "John",
     options: [{display: 'Spaghetti & Meatballs', id: 1, score: 0}, {display: 'Ribs', id: 2, score: 0}],
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
     options: [{display: 'Pasta Primavera', id: 1, score: 0}, {display: 'Salmon', id: 2, score: 0}],
     voters: [
       { name: 'Larry', vote: 1 },
       { name: 'John' , vote: 1 },
     ]
   }
 ]
}

var id = {
  id: function() {
    return Math.floor(Math.random() * 100)
  }
}

// Get a list of all current meals.
mealVotes.get('/', function(req, res) {
 res.send(meals);
});

// Add a new meal to vote on.
mealVotes.post('/', function(req, res) {
 var theMeal = {};
 theMeal.id = 0
 theMeal.id = id.id()
 theMeal.poster = req.body.poster
 theMeal.options = [];
 var theDishes = req.body.dishes;
 theDishes.forEach(function(dish) {
   console.log(dish)
   theMeal.options.push({display: dish, id: id.id(), score: 0})
 })
 theMeal.voters = [];
 meals.data.push(theMeal);

 profiles.forEach(function(user) {
   if(req.body.poster == user.name) {
     user.friends.forEach(function(number) {
       sendText(number.number, req.body.poster, number.name)
     })
   }
 })
 res.send(meals);
});

function sendText(number, person, user) {
  client.sendMessage({
      to: number,
      from: '+15163070984',
      body: 'Hi ' + user + ', ' + person + ' has some serious menu panic and needs your help!  Login to menu-panic.heroku.com and help them out.'
  }, function(err, responseData) {
      if (!err) {
          console.log(responseData.from);
          console.log(responseData.body);
      }
      console.log('MESSAGE SENT')
  });
}

// Vote on an existing meal.
mealVotes.put('/vote/:id/:option/:name', function(req, res) {
var voted = false;
meals.data.forEach(function(meal) {
  if (meal.id == req.params.id) {
    meal.voters.forEach(function(voter) {
      if (voter.name == req.params.name) {
        voted = true;
        res.send('You voted already')
        //console.log('This person voted already')
      }
    });
  }
});

if(!voted) {
  var vote = {}
  var name = req.params.name;
  meals.data.forEach(function(meal) {
    if(meal.id == req.params.id) {
        meal.options.forEach(function(items){
          if(req.params.option == items.display) {
            vote.id = items.id
          }
        });
        meal.voters.push( { name: name, vote: vote.id } );
    }
  });
  res.send(meals)
}
});

mealVotes.get('/results/:poster', function(req, res) {
  var results;
  meals.data.forEach(function(data) {
    data.options.forEach(function(meal) {
      data.voters.forEach(function(vote) {
        meal.score = 0;
      });
    })
    data.options.forEach(function(meal) {
      data.voters.forEach(function(vote) {
        console.log(req.params.poster + 'Just Added')
        console.log(data.poster)
          results = data.options
            if(vote.vote == meal.id) {
              meal.score++
              console.log(meal.display, meal.score)
            }
      });
      console.log(meal.display, meal.score)
    })
  });
  console.log(results)
  console.log(meals)
  res.send(meals)
});



module.exports = mealVotes;
