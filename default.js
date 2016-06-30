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
