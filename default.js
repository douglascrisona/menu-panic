var mealTypes = []
var meal = {}

var hide = document.getElementsByClassName('view-search')[0];

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
    //panel panel-default col-md-5 list-group'theLocation.setAttribute('class', 'panel panel-default col-md-5 list-group')
    //result.venues[0].menus
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
    var theEntireMenu = document.createElement('div');
    theEntireMenu.setAttribute('class', 'col-md-8 list-group')
    theEntireMenu.appendChild(theLocation);
    switchClass(hide, 'view-search', 'hide-search')
    document.getElementsByClassName('view')[0].appendChild(theEntireMenu)
  };
});

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
  return theContent
}


function switchClass(name, remove, add) {
  name.classList.remove(remove);
  name.classList.add(add)
}



function showSearch() {
  var showSearchBox = document.getElementsByClassName('hide-search')[0];
  showSearchBox.classList.remove('hide-search');
  showSearchBox.classList.add('view-search');
}


var searchAgain = document.getElementById('click');
searchAgain.addEventListener('click', function() {
  var hideResults = document.getElementsByClassName('show')[0];
  hideResults.classList.remove('show');
  hideResults.classList.add('hide-results');
  showSearch()
});



function clear(area) {
  while(area.firstChild) {
    area.removeChild(area.firstChild);
  }
}





// Type of route
// How to use the request module
// How to access the returned data
