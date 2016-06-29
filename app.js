var express = require('express')
var app = express()
var jsonParser = require('body-parser').json();
var request = require('request');


app.use(jsonParser);
app.use(express.static('./'))


app.post('/restaurants', function(req, res) {
  var results = []
  request({
      url: 'https://api.locu.com/v2/venue/search',
      json: {
        "api_key" : "f165c0e560d0700288c2f70cf6b26e0c2de0348f",
        "fields" : [ "name", "contact", "location", "menus"],
        "venue_queries" : [
          {
            "name" : req.body.name,
            "location" : {
              "postal_code" : req.body.zip
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
          console.log(response.statusCode, JSON.stringify(body));

          res.send(results)
      }
  });
});

app.listen(8080);






// User searches for venue by nam & location
// If matched, returns container with venue name and location
// When user clicks, locu id loads entire menu


/** Functionality
1. User can search restaurants
2. User can select menu items
3. User can broadcast a votes.
4. User can respond to broadcast by voting.
  - How to handle notifications? (sms via twilio?)

5. Users can make friend circles.
6. User can broadcast to a specific circle.
7. User can gain badges/reputation. (Quick responder, accurate, loose cannon)

8. Score menu items based on past votes.
**/
