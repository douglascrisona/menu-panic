var userName = {}
var hide = document.getElementsByClassName('view-search')[0];
var theArea = document.getElementsByTagName('body')[0];

window.addEventListener('load', function() {
  var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login/check/');
    xhr.send();

    xhr.onload = function() {
      verifyUser(xhr.responseText)
  }
});

document.getElementById('logo').addEventListener('click', function() {
  window.location.reload()
})

var loginButton = document.getElementById('login');
loginButton.addEventListener('click', function(e) {
  var name = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var verify = loginCheck(name, password);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(verify));

  xhr.onload = function() {
    xhr.open('POST', '/login/check')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send()

    xhr.onload = function() {
      verifyUser(xhr.responseText)
    }
  }
});

function verifyUser(response) {
  if(response) {
    var login = document.getElementsByClassName('login')[0]
    switchClass(login, 'login', 'hide-login')

    var theSearch = document.getElementsByClassName('hide')[0]
    switchClass(theSearch, 'hide', 'view')
    userName.name = response;
    viewVotes();
    viewMeals();
  }
}


function viewVotes() {
  var viewVotes = document.createElement('div');
  viewVotes.textContent = 'Pending Votes'
  viewVotes.setAttribute('id', 'view-votes')

  document.getElementById('header').appendChild(viewVotes)
}

function viewMeals() {
  var viewMeals = document.createElement('div');
  viewMeals.textContent = 'My Meals';
  viewMeals.setAttribute('id', 'view-meals');
  document.getElementById('header').appendChild(viewMeals)
}

var button = document.getElementById('search-button');
button.addEventListener('click', function(e) {
var searchTerm = document.getElementById('search')
var searchZip = document.getElementById('postal')


  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/restaurants/?name=' + searchTerm.value + '&' + 'zip=' + searchZip.value );
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.send()

  xhr.onload = function() {
    var results = JSON.parse(xhr.responseText)
    var theLocation = document.createElement('div');

    results.forEach(function(result) {
      result.venues.forEach(function(venue) {
        theLocation.appendChild(theVenue(venue));
      });

      result.venues[0].menus.forEach(function(menu){
        theLocation.appendChild(theMenu(menu));

        menu.sections.forEach(function(section) {
          theLocation.appendChild(theSection(section));

          section.subsections.forEach(function(subsection) {

            subsection.contents.forEach(function(content) {
              theLocation.appendChild(theContent(content));
            })
          });
        });
      });
    });
    menuDisplay(theLocation)
  };
});


function theVenue(data) {
  var theVenue = document.createElement('div');
  theVenue.setAttribute('id', 'restaurant-name')
  theVenue.setAttribute('class', 'list-group-item')
  theVenue.textContent = data.name;
  return theVenue;
}

function theMenu(data) {
  var theMenu = document.createElement('div');
  theMenu.setAttribute('id', 'menu-container')
  theMenu.setAttribute('class', 'list-group-item')
  theMenu.textContent = data.menu_name;
  return theMenu;
}

function theSection(data) {
  var theSection = document.createElement('div')
  theSection.setAttribute('id', 'section-names')
  theSection.setAttribute('class', 'list-group-item')
  theSection.textContent = data.section_name;
  return theSection;
}

function theSubSection(data) {
  var theSubSection = document.createElement('div');
  theSubSection.setAttribute('id', 'subsection-names');
  theSection.textContent = data.subsection_name;
  return theSubSection
}

function theContent(data) {
  var theContent = document.createElement('div');
  theContent.textContent = data.name;
  theContent.setAttribute('class', 'list-group-item')
  theContent.setAttribute('id', 'menu-items')

  var option = document.createElement('input')
  option.setAttribute('type', 'checkbox')
  option.setAttribute('class', 'option')
  option.setAttribute('value', data.name)
  theContent.appendChild(option)
  return theContent
}

function menuDisplay(theLocation) {
  var theEntireMenu = document.createElement('div');
  theEntireMenu.setAttribute('class', 'col-md-8 list-group form')
  theEntireMenu.setAttribute('id', 'vote-form')
  theEntireMenu.appendChild(theLocation);
  var voteButton = document.createElement('button')
  voteButton.setAttribute('class', 'btn btn-primary')
  voteButton.textContent = 'Get some help!'
  voteButton.setAttribute('id', 'vote-button')
  theEntireMenu.appendChild(voteButton)
  switchClass(hide, 'view-search', 'hide-search')
  document.getElementsByClassName('view')[0].appendChild(theEntireMenu)
}


function switchClass(name, remove, add) {
  name.classList.remove(remove);
  name.classList.add(add)
}

var theMeal = {}
var checkedItems = []
var theArea = document.getElementsByTagName('body')[0];
theArea.addEventListener('click', function(e) {
  var menuItem = e.target;
  if(menuItem.className === 'option') {
      checkedItems.push(menuItem.value)
      theMeal.dishes = checkedItems
      theMeal.poster = userName.name
  }
});

var dishes = {}
theArea.addEventListener('click', function(e) {
  var submitVote = e.target;
  if(submitVote.id == 'vote-button') {

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/mealVotes')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(theMeal))

    window.location.reload()

    xhr.onload = function() {
    }

    console.log('Vote sent')
  }
})

var theNewArea = document.getElementsByClassName('hide')[0]
var voteArea = document.getElementsByClassName('view-vote')[0]
var pendingVotes;

theArea.addEventListener('click', function(e) {
  var voteLink = e.target;
  if(voteLink.id == 'view-votes') {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/mealVotes')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send()

    xhr.onload = function() {
      var theButton
      pendingVotes = JSON.parse(xhr.responseText)
      pendingVotes.data.forEach(function(details) {
        voteArea.appendChild(posterName(details.poster))

        details.options.forEach(function(dishes) {
          voteArea.appendChild(dishOptions(dishes.display, details.id))
        });
        voteArea.appendChild(voteButton())
      });
    };
    switchClass(theNewArea, 'hide', 'votes')
  }
});


function posterName(data) {
  var posterName = document.createElement('div');
  posterName.textContent = data + "'s meal";
  posterName.setAttribute('id','poster-name');
  posterName.setAttribute('class', 'h3')
  return posterName;
}

function voteButton() {
  var voteButton = document.createElement('button');
  voteButton.textContent = 'Vote'
  voteButton.setAttribute('class', 'btn btn-default')
  voteButton.setAttribute('id', 'cast-vote')
  return voteButton
}

function dishOptions(data, id) {
  var dishes = document.createElement('div');
  dishes.textContent = data;
  dishes.setAttribute('id', 'dish-options');
  dishes.setAttribute('class', 'h3')
  //dishes.setAttribute('value', id)

  var voteSelector = document.createElement('input');
  voteSelector.setAttribute('class', 'vote-radio')
  voteSelector.setAttribute('type', 'radio');
  //voteSelector.setAttribute('id', 'the-vote');
  voteSelector.setAttribute('id', data);
  voteSelector.setAttribute('value', id);
  voteSelector.setAttribute('name', 'vote');


  var dishBox = document.createElement('div');
  dishBox.setAttribute('class', 'list-group-item');
  dishBox.setAttribute('id', 'dish-box');

  dishBox.appendChild(dishes);
  dishBox.appendChild(voteSelector);

  return dishBox;
}

var voteChoice;
var voteRadio = document.getElementsByClassName('view-vote')[0];
voteRadio.addEventListener('click', function(e) {
  var theVote = e.target;
  if(theVote.name == 'vote') {
    voteMatch(theVote.value, theVote.id)
    console.log(theItem)
    voteChoice = theItem
  }
})

var votePage = document.getElementsByClassName('view-vote')[0];
votePage.addEventListener('click', function(e) {
  var submitVote = e.target;
  if(submitVote.id == 'cast-vote') {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/mealVotes/vote/' + voteChoice.id + '/' + voteChoice.option + '/' + voteChoice.name);
    xhr.send();

    xhr.onload = function() {
      console.log(xhr.responseText)
    }
  }
});


var myMeals;
document.getElementById('header').addEventListener('click', function(e) {
  var results = document.createElement('div');
  results.setAttribute('class', 'panel panel-default')
  results.setAttribute('id', 'score-box')
  var theResults = document.getElementsByClassName('view')[0]
  var meals = document.getElementsByClassName('view-vote')[0]
  var theMeal = e.target;
  var name = userName.name

  if(theMeal.id == 'view-meals') {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/mealVotes/results/' + name);
    console.log(name)
    xhr.send();

    xhr.onload = function() {
      var display = document.createElement('div');
      display.setAttribute('class', 'panel panel-default');
      myMeals = JSON.parse(xhr.responseText);
      myMeals.data.forEach(function(person) {
        if(person.poster == name) {
          document.body.appendChild(buffer())
          person.options.forEach(function(data) {
            document.body.appendChild(dishResultBox(data.display, data.score))
          });
        };
      });
      console.log(myMeals)
      switchClass(theResults, 'view', 'hide')
      switchClass(meals, 'view-vote', 'hide')
    }
  }
});

function buffer() {
  var display = document.createElement('div');
  display.setAttribute('id', 'buffer')

  return display
}

function dishResultBox(name, score) {
  var dishName = document.createElement('div');
  dishName.setAttribute('class', 'panel-body')
  dishName.textContent = name;
  dishName.setAttribute('id', 'dish-name')

  var dishScore = document.createElement('div');
  dishScore.setAttribute('class', 'panel-body')
  dishScore.textContent = 'Score: ' + score;
  dishScore.setAttribute('id', 'dish-score')

  var theDisplay = document.createElement('div');
  theDisplay.setAttribute('class', 'panel panel-body')
  theDisplay.setAttribute('id', 'the-new-display')
  theDisplay.appendChild(dishName)
  theDisplay.appendChild(dishScore)

  return theDisplay
}

function voteMatch(value, item) {
  theItem = {};
  theItem.id = value;
  theItem.option = item;
  theItem.name = userName.name

  return theItem;
}

function loginCheck(username, password) {
  userCreds = {};
  userCreds.name = username;
  userCreds.password = password;

  return userCreds;
}
