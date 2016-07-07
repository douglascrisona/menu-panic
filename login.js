var express = require('express')
var profiles = require('./profiles.js')
var login = express.Router();
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var trackingId = require('./trackingId.js')
var session = require('./session.js');
var userSessions = require('./user-sessions.js')

sessions  = [
  { name: 'John', id: '12321321'},
]


login.use(cookieParser);
login.use(jsonParser);



// Try to login
login.post('/', function(req, res) {

  profiles.forEach(function(user) {
    if((req.body.name == user.name) && (req.body.password == user.password)) {
      var session = {};
      var tracking = trackingId.id()
      session.name = req.body.name
      session.id = tracking
      userSessions.sessions.push(session)
      res.cookie('trackingID', tracking)
      console.log(userSessions.sessions)
      console.log(user.name)
    }
  });
  res.send()
});


var validSession = []

login.post('/check', function(req, res) {
    var id = req.cookies.trackingID

    console.log(req.cookies.trackingID)
    userSessions.sessions.forEach(function(cookie) {
      if(id == cookie.id) {
        validSession.push(cookie.name)
        console.log('VALID')
        if (validSession.length > 0) {
          res.send(id)
        }
      }
    })

  //res.send(id)
})


module.exports = login
