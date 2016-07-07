var mealTypes = []
var meal = {}
var session = {}
var loginName = {}
var hide = document.getElementsByClassName('view-search')[0];

var theArea = document.getElementsByTagName('body')[0];

// Displays home page for users with valid sessions
window.addEventListener('load', function() {
  var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login/check/');
    xhr.send();

    xhr.onload = function() {
      verifyUser(xhr.responseText) //Checks if session is valid and displays home page
  }
});

// Logs user in, clears page and loads homepage
var loginButton = document.getElementById('login');
loginButton.addEventListener('click', function(e) {
  var name = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var verify = loginCheck(name, password);
  loginName.name = name;

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

    viewVotes();
  }
}

// Generates Pending Votes link
function viewVotes() {
  var viewVotes = document.createElement('div');
  viewVotes.textContent = 'Pending Votes'
  viewVotes.setAttribute('id', 'view-votes')
  document.getElementById('header').appendChild(viewVotes)
}


// Searches for restaurant and loads menu
var button = document.getElementById('search-button');
button.addEventListener('click', function(e) {
var searchTerm = document.getElementById('search')
var searchZip = document.getElementById('postal')
console.log(loginName.name)

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/restaurants/?name=' + searchTerm.value + '&' + 'zip=' + searchZip.value );
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.send()

  xhr.onload = function() {
    results = JSON.parse(xhr.responseText)
    var theLocation = document.createElement('div');

    results.forEach(function(result) {
      result.venues.forEach(function(venue) {
        theLocation.appendChild(theVenue(venue));

      });

      result.venues[0].menus.forEach(function(menu){
        theLocation.appendChild(theMenu(menu));

        menu.sections.forEach(function(section) {
          theLocation.appendChild(theSection(section));

          section.subsections.forEach(function(subsection){

            subsection.contents.forEach(function(content) {
              theLocation.appendChild(theContent(content));
            })
          });
        });
      });
    });
    menuDisplay(theLocation)  // Creates menu element on page
  };
});


// Generates Menu on Results Page
function theVenue(data) {
  var theVenue = document.createElement('div');
  theVenue.setAttribute('id', 'restaurant-name')
  theVenue.setAttribute('class', 'list-group-item')
  theVenue.textContent = data.name; /**+ " | " + data.location.address1**/
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
  theContent.textContent = data.name /**+ " description: " + data.description**/;
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


// Clears Page
function switchClass(name, remove, add) {
  name.classList.remove(remove);
  name.classList.add(add)
}


// Should enable new search
function showSearch() {
  var showSearchBox = document.getElementsByClassName('hide-search')[0];
  showSearchBox.classList.remove('hide-search');
  showSearchBox.classList.add('view-search');
}

var checkedOption = [] //Stores selected items from the menu
var theArea = document.getElementsByTagName('body')[0];
theArea.addEventListener('click', function(e) {
  var theNewOption = e.target;
  if(theNewOption.className === 'option') {
      checkedOption.push(theNewOption.value)
  }
});

// Supposed to create 'Pending Votes' page /** Vote Page **/
theVoteOptions = []
theArea.addEventListener('click', function(e) {
  var voteLink = e.target;
  if(voteLink.id == 'view-votes') {
    //console.log(theVoteOptions)
    theVoteOptions.forEach(function(item) {
      console.log(item)
      console.log(item.item)
    });
    switchClass(theArea, 'view', 'hide')
    votePage(checkedOption)

  }
})

// Loads selected items to new vote page
theArea.addEventListener('click', function(e) {
  var submitVote = e.target;
  if(submitVote.id == 'vote-button') {

    votePage(checkedOption)

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/choices')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(checkedOption))
    console.log(checkedOption)

    xhr.onload = function() {
      console.log(xhr.responseText)
      theVoteOptions.push(JSON.parse(xhr.responseText))
    }

    console.log('Vote sent')
  }
})

// Generates vote page elements
function votePage(options) {
  //var choices = document.createElement('div')
  //choices.textContent = options
  options.forEach(function(item) {
    var itemBox = document.createElement('div')
    itemBox.setAttribute('class', 'panel panel-default col-xs-3')
    itemBox.textContent = item + ' '
    itemBox.setAttribute('id', 'result-boxes')
    itemBox.setAttribute('data-id', session.id)

    var voteSelector = document.createElement('input');
    voteSelector.setAttribute('type', 'radio')
    voteSelector.setAttribute('class', 'pull-right')
    voteSelector.setAttribute('id', 'the-vote')
    voteSelector.setAttribute('name', 'vote')
    voteSelector.setAttribute('value', item)
    itemBox.appendChild(voteSelector);

    document.getElementsByClassName('view-vote')[0].appendChild(itemBox)

  })
  var voteIt = document.createElement('button');
  voteIt.textContent = 'VOTE'
  voteIt.setAttribute('class', 'btn btn-primary')
  voteIt.setAttribute('id', 'the-vote-button')
  document.getElementsByClassName('view-vote')[0].appendChild(voteIt)

  var newArea = document.getElementsByClassName('view')[0]
  switchClass(newArea, 'view', 'hide-menu')
}

// Submits item/dish value to back-end
document.getElementsByClassName('view-vote')[0].addEventListener('click', function(e) {
  voteButton = e.target;
  if(voteButton.id == 'the-vote-button') {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/vote')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(theItem))


  }
})

// Selects item/dish value
var voteRadio = document.getElementsByClassName('view-vote')[0];
voteRadio.addEventListener('click', function(e) {
  var theVote = e.target;
  if(theVote.id == 'the-vote') {
    voteMatch(theVote.value)
    console.log(theItem)
  }
})

function voteMatch(item) {
  theItem = {};
  theItem.food = item;
  //theItem.password = '1234'
  return theItem;
}

function loginCheck(username, password) {
  userCreds = {};
  userCreds.name = username;
  userCreds.password = password;
  return userCreds;
}

// User logs in
// User searches for menu
// User selects menu items and broadcasts votes
// Second user overwrites the existing menu choices
// Can't broadcast global vote
