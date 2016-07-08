var express = require('express')
var jsonParser = require('body-parser').json();
var request = require('request');
var restaurants = express.Router();

restaurants.use(jsonParser)


restaurants.get('/', function(req, res) {
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
          console.log(response.statusCode);

          res.send(results)
      }
  });
  console.log(req.query)
});


module.exports = restaurants;
