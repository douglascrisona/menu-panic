var express = require('express')
var user = express.Router();
var profiles = require('./profiles.js')

// Get a particular users details.
user.get('/:user', function(req, res) {
  profiles.forEach(function(user) {
    if(req.params.user == user.name) {
      
      res.send(user)
    }
  })
});

// Create a new user.
user.post('/:user/:password', function(req, res) {
  var newUser = {name: req.params.user, password: req.params.password}
  profiles.push(newUser)
  console.log(profiles)
/**
  profiles.forEach(function(user) {
    if(user.name !== req.params.user) {
      profiles.push({name: req.params.user, password: req.params.password})
    }
  })
**/
  res.send(newUser)
});

// Change a users details.
user.put('/:user', function(req, res) {

});

// Delete a user.
user.delete('/:user', function(req, res) {
  profiles.forEach(function(user) {
    if(req.params.user == user.name) {
      var deleteUser = {name: req.params.user }
      console.log(deleteUser)
      console.log(profiles)
      console.log(profiles.indexOf(user.Name))
    }
  })
  res.send()
});


module.exports = user;
