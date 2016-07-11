var express = require('express')
var votes = express.Router();



// Get all the votes.
votes.get('/', function(req, res) {
  console.log('testing')
  res.send()
});

// Post a vote.
votes.post('/:voteId', function(req, res) {

  if(theVotes.status == 'complete') {
    theVotes.item.primary.name = req.params.voteId
    console.log(theVotes)

  } else {
    console.log('There are no pending votes')
  }

  res.send()

});

var theVotes = {
  status: 'pending',
    item: {
      primary: {name: 'Pizza'},
      secondary: {name: 'Hamburger' }
    },
    votes: [
      { user: 'John', vote: 1},
      { user: 'Bob', vote: 2 }
    ],
    status: 'complete',
      item: {
        primary: { name: 'hotdogs' }
      },
      votes: {
        vote: 3
      }

}

/**
var theVotes = {
  { status: "complete",
    item: {
      primary: { id: "", "Name" } // A menu item.
      secondary: {} // Another item.
    }
    votes: {
      { user: "Moe", vote: 1 }, // User voted for item 1.
      { user: "Larry", vote: 2 },
      { user: "Curly", vote: 1 }
    }
  },
  { status: "pending",

  }
}
**/

module.exports = votes;
