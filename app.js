var express = require('express')
var app = express()
var jsonParser = require('body-parser').json();
var locu = require('locu');
var request = require('request');


app.use(jsonParser);

var restaurants = [
  { name: 'Beachcomber-Cafe', menu: ['chips & guac', 'chips & salsa']},
  { name: 'Wilmas', menu: ['steak and eggs', 'island favorite omelette']},
  { name: 'Chipotle', menu: ['green eggs & ham']},
  { name: 'McDonalds', menu: ['big mac']}
]

app.get('/restaurants/:name', function(req, res) {
  restaurants.forEach(function(restaurant) {
    if(req.params.name == restaurant.name) {
      console.log(restaurant.name)
      restaurant.menu.forEach(function(item) {
        console.log(item)
      })
    }
  })
  res.send()
})

var newRestaurants = {id: "5e69999f995c8ad54379"}
var request = require('request');

app.get('/restaurant/:name', function(req, res) {
  if(req.params.name == newRestaurants.id) {
    request({
        url: 'https://api.locu.com/v2/venue/search',
        json: {
          "api_key" : "f165c0e560d0700288c2f70cf6b26e0c2de0348f",
          "fields" : [ "name", "location", "contact" ],
          "venue_queries" : [
            {
              "locu_id" : newRestaurants.id
            }
          ]
        },
        method: 'POST' //Specifies method (requirement from API page)
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode, JSON.stringify(body));
        }
    });
  }
  res.send()

})






app.listen(8080);

//API CALL FOR BY ID, RETRIEVES VENUE NAME, LOCATION, CONTACT INFO
/**
curl -X POST https://api.locu.com/v2/venue/search -d '{
  "api_key" : "1964ce6a674c2fdc5e1e27567e5add82e755046a",
  "fields" : [ "name", "location", "contact" ],
  "venue_queries" : [
    {
      "locu_id" : "5e69999f995c8ad54379"
    }
  ]
}'

RETRIEVES ENTIRE MENU
curl -X POST https://api.locu.com/v2/venue/search -d '{
  "api_key" : "1964ce6a674c2fdc5e1e27567e5add82e755046a",
  "fields" : [ "name", "location", "menus" ],
  "venue_queries" : [
    {
      "locu_id" : "5e69999f995c8ad54379"
    }
  ]
}'





// User searches for venue by location
// If matched, returns container with venue name and location
// When user clicks, locu id loads entire menu



1. User can search restaurants
2. User can select menu items
3. User can broadcast a votes.
4. User can respond to broadcast by voting.
  - How to handle notifications? (sms via twilio?)

5. Users can make friend circles.
6. User can broadcast to a specific circle.
7. User can gain badges/reputation. (Quick responder, accurate, loose cannon)

8. Score menu items based on past votes.


// Call to LOCU http -v get https://api.locu.com/v1_0/venue/search/?api_key=1964ce6a674c2fdc5e1e27567e5add82e755046a


// Old Code--Destroy when sure not needed

app.post('/restaurants', function(req, res) {
  restaurants.forEach(function(restaurant) {
    if(req.body.name == restaurant.name) {
      console.log(restaurant.name)
      restaurant.menu.forEach(function(item) {
        console.log(item)
      })
    }
  })
  res.send()
})
**/
