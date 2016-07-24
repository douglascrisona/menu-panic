var client = require('twilio')('ACade02b2b721da17f3c9f02b627d3e3a4', '06af81eed7d85f7a60f59f18f6bacc11');

module.exports = {
  createMealText: function(number, poster, user) {
    client.sendMessage({
        to: number,
        from: '+15163070984',
        body: 'Hi ' + user + ', ' + poster + ' has some serious menu panic and needs your help!  Login to menu-panic.heroku.com and help them out.'
    }, function(err, responseData) {
        if (!err) {
            console.log(responseData.from);
            console.log(responseData.body);
        }
        console.log('MESSAGE SENT')
    });
  },
  voteText: function(number, poster, user, option) {
    client.sendMessage({
        to: number,
        from: '+15163070984',
        body: 'Hi ' + poster + ', ' + user + ' thinks you should order ' + option
    }, function(err, responseData) {
        if (!err) {
            console.log(responseData.from);
            console.log(responseData.body);
        }
        console.log('MESSAGE SENT')
    })
  }
}
