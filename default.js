var mealTypes = []
var meal = {}

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
    theLocation.setAttribute('class', 'panel panel-default col-md-5')
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
    theEntireMenu.appendChild(theLocation);
    hideSearch()
    document.getElementsByClassName('view')[0].appendChild(theEntireMenu)
  };
});

function theVenue(data) {
  var theVenue = document.createElement('div');
  theVenue.setAttribute('id', 'restaurant-name')
  //theVenue.setAttribute('class', 'panel panel-default')
  theVenue.textContent = data.name;
  return theVenue;
}

function theMenu(data) {
  var theMenu = document.createElement('div');
  theMenu.setAttribute('id', 'menu-container')
  //theMenu.setAttribute('class', 'panel panel-default')
  theMenu.textContent = data.menu_name;
  return theMenu;
}

function theSection(data) {
  var theSection = document.createElement('div')
  theSection.setAttribute('id', 'section-names')
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
  //theContent.setAttribute('class', 'panel panel-default')
  theContent.setAttribute('id', 'menu-items')
  return theContent
}




/**
  xhr.onload = function() {
    results = JSON.parse(xhr.responseText)
    results.forEach(function(result) {
      result.venues.forEach(function(venue) {
        displayResults(venue.name, venue.location.locality, venue.location.address1)
        console.log(venue.name, venue.location.locality, venue.location.address1)
        venue.menus.forEach(function(mealType) {
          console.log(mealType.menu_name)
          mealTypes.push(mealType.menu_name.name) //temporary
          mealType.sections.forEach(function(sub) {
            console.log(sub.section_name)
            mealTypes.push(sub.section_name) //temporary
            sub.subsections.forEach(function(dishes) {
              dishes.contents.forEach(function(info) {
                console.log(info.name)
                mealTypes.push(info.name) //temporary
              })
            })
          })
        });
      });
    });
  }
});
**/



function displayRestaurant(name, location, address) {
  hideSearch()

  var showRestaurant = document.getElementsByClassName('hide-results')[0];
  showRestaurant.classList.remove('hide-results');
  showRestaurant.classList.add('show')

  var nameContainer = document.getElementById('restaurant-info')
  var restaurantName = document.createElement('div');

  restaurantName.setAttribute('class', 'panel-body');
  restaurantName.textContent = name +  " " + location + " " + address;
  restaurantName.setAttribute('class', 'h5');

  nameContainer.appendChild(restaurantName);

}




function hideSearch() {
  var hideSearchBox = document.getElementsByClassName('view-search')[0];
  hideSearchBox.classList.remove("view-search");
  hideSearchBox.classList.add("hide-search");
}

function showSearch() {
  var showSearchBox = document.getElementsByClassName('hide-search')[0];
  showSearchBox.classList.remove('hide-search');
  showSearchBox.classList.add('view-search');
}

function displayResults(name, location, address) {
  hideSearch()
  var showRestaurant = document.getElementsByClassName('hide-results')[0];
  showRestaurant.classList.remove('hide-results');
  showRestaurant.classList.add('show')

  var nameContainer = document.getElementById('restaurant-info')
  var restaurantName = document.createElement('div');

  restaurantName.setAttribute('class', 'panel-body');
  restaurantName.textContent = name +  " " + location + " " + address;
  restaurantName.setAttribute('class', 'h5');

  nameContainer.appendChild(restaurantName);
}

var searchAgain = document.getElementById('click');
searchAgain.addEventListener('click', function() {
  var hideResults = document.getElementsByClassName('show')[0];
  hideResults.classList.remove('show');
  hideResults.classList.add('hide-results');

  showSearch()
});



var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', function() {
  var sectionTitle = document.createElement('div');
  sectionTitle.textContent = mealTypes;
  var menuContainer = document.getElementsByClassName('hide-menu')[0];
  menuContainer.classList.remove('hide-menu');
  menuContainer.classList.add('show-menu')

  menuContainer.appendChild(sectionTitle)
});

function displayHeaders(headers) {
  var sectionTitle = document.createElement('div');
  sectionTitle.textContent = headers;
  var menuContainer = document.getElementsByClassName('hide-menu')[0];
  menuContainer.classList.remove('hide-menu');
  menuContainer.classList.add('show-menu')

  menuContainer.appendChild(sectionTitle)
}







// Type of route
// How to use the request module
// How to access the returned data
