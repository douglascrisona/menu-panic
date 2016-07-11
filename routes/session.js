var express = require('express')
var profiles = require('../profiles.js')
var userSessions = require('../user-sessions.js')
var session = express.Router();
var cookieParser = require('cookie-parser')();

session.use(cookieParser);

// Get the session for the current user.
session.get('/:user', function(req, res) {
  //console.log('testing')
console.log(req.cookies);
console.log(req.params.user)


  userSessions.sessions.forEach(function(user) {

    if(user.id == req.cookies.trackingID) {
      console.log(user.name)
    }
  })


  res.send()
});

// Create a new session.
session.post('/:user', function(req, res) {

});

// Change a session.
session.put('/:user', function(req, res) {

});

// Delete a session.
session.delete('/:user', function(req, res) {

});


module.exports = session;
