var express = require('express')
var app = express()
var jsonParser = require('body-parser').json();
var request = require('request');
var profiles = require('./profiles.js')
var cookieParser = require('cookie-parser')();

app.use(cookieParser)

var user = require('./user.js'); // NEW
app.use('/user', user); // NEW

var login = require('./login.js'); //NEW
app.use('/login', login); //NEW

var session = require('./session.js'); //New
app.use('/session', session) //New

var votes = require('./votes.js'); //New
app.use('/votes', votes); //New

var meals = require('./meals.js'); //New
app.use('/meals', meals);//New


var userID = [] // Provides user a sepcific ID for assigning selected menu items and voting
var theChoices = []

app.use(jsonParser);
app.use(express.static('./'))



app.get('/restaurants/', function(req, res) {
  var results = []
  request({
      url: 'https://api.locu.com/v2/venue/search',
      json: {
        "api_key" : "f165c0e560d0700288c2f70cf6b26e0c2de0348f",
        "fields" : [ "name", "contact", "location", "menus"],
        "venue_queries" : [
          {
            "name" : req.query.name,
            "location" : {
              "postal_code" : req.query.zip
            }
          }
        ]
      },
      method: 'POST' //Specifies method (requirement from API page)
  }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          results.splice(0, 1)
          results.push(body)
          console.log(response.statusCode /**JSON.stringify(body)**/);

          res.send(results)
      }
  });
  console.log(req.query)
});

// Will be removed
// Should place selected items from menu in corresponding user object
app.post('/choices/', function(req, res) {
  console.log(req.body)
  //console.log(req.body)
  userID.forEach(function(userName) {
    profiles.forEach(function(name) {
      if(userName == name.name) {
        name.choices.forEach(function(item) {
            item.items = req.body // Need unique identifier for menu choices
            console.log(item.items)
            //console.log(item.items)
            //console.log(name.name, name.choices)
            var theChoice = {}
            theChoice.item = item.items
            theChoices.splice(0, 1)
            theChoices.push(theChoice)
        });
     }
   })
  });
    res.send(theChoices)
});


// Will be removed
app.post('/vote', function(req, res) {
  profiles.forEach(function(item) {
    item.choices.forEach(function(food) {
      food.items.forEach(function(dish) {
        if(req.body.food == dish) {
          console.log('ONE VOTE FOR ' + dish)
        }
      })
    })
  })

  res.send()
})



app.listen(8080);





// User searches for venue by name & location
// If matched, returns container with venue name and location
// When user clicks, locu id loads entire menu


/** Functionality
1. User can search restaurants & view menu
2. User can braodcast a vote
3. User can respond to broadcast by voting.
  - How to handle notifications? (sms via twilio?)
5. Users can make friend circles.
6. User can broadcast to a specific circle.
7. User can gain badges/reputation. (Quick responder, accurate, loose cannon)

8. Score menu items based on past votes.
**/
