var mealTypes = []
var meal = {}
var session = {}
var loginName = {}
var hide = document.getElementsByClassName('view-search')[0];


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
    if(xhr.responseText == name) {
      var login = document.getElementsByClassName('login')[0]
      switchClass(login, 'login', 'hide-login')

      var theSearch = document.getElementsByClassName('hide')[0]
      switchClass(theSearch, 'hide', 'view')

      session.id = xhr.responseText
    }
  }
})


var button = document.getElementById('search-button');
button.addEventListener('click', function(e) {
var searchTerm = document.getElementById('search')
var searchZip = document.getElementById('postal')

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
        //displayRestaurant(venue.name, venue.location.locality, venue.location.address1)
      });

      result.venues[0].menus.forEach(function(menu){
        theLocation.appendChild(theMenu(menu));

        menu.sections.forEach(function(section) {
          theLocation.appendChild(theSection(section));

          section.subsections.forEach(function(subsection){
            //theLocation.appendChild(theSubSection(subsection));

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

/**
var searchAgain = document.getElementById('click');
searchAgain.addEventListener('click', function() {
  var hideResults = document.getElementsByClassName('show')[0];
  hideResults.classList.remove('show');
  hideResults.classList.add('hide-results');
  showSearch()
});
**/


var checkedOption = []
var theArea = document.getElementsByTagName('body')[0];
theArea.addEventListener('click', function(e) {
  var theNewOption = e.target;
  if(theNewOption.className === 'option') {
    //checkedOption.push(document.querySelector('.option:checked').value)
      checkedOption.push(theNewOption.value)
  }
});


theArea.addEventListener('click', function(e) {
  var submitVote = e.target;
  if(submitVote.id == 'vote-button') {

    votePage(checkedOption)

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/choices')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(checkedOption))
    console.log(checkedOption)

    console.log('Vote sent')
  }
})

function votePage(options) {
  //var choices = document.createElement('div')
  //choices.textContent = options
  options.forEach(function(item) {
    var itemBox = document.createElement('div')
    itemBox.setAttribute('class', 'panel panel-default col-xs-3')
    itemBox.textContent = item + ' '
    itemBox.setAttribute('id', 'result-boxes')

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

document.getElementsByClassName('view-vote')[0].addEventListener('click', function(e) {
  voteButton = e.target;
  if(voteButton.id == 'the-vote-button') {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/vote')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(theItem))


  }
})


theItem = {}

var voteRadio = document.getElementsByClassName('view-vote')[0];
voteRadio.addEventListener('click', function(e) {
  var theVote = e.target;
  if(theVote.id == 'the-vote') {
    //theItem.food = theVote.value
    //theItem.password = '1234'
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
