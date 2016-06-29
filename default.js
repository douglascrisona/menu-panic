var button = document.getElementById('search-button');

button.addEventListener('click', function(e) {
var searchTerm = document.getElementById('search')
var searchZip = document.getElementById('postal')
  restSearch = venueSearch(searchTerm.value, searchZip.value)
  console.log(restSearch)


  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/restaurants/');
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(restSearch))
  //console.log(restSearch)

  xhr.onload = function() {
    //console.log(JSON.parse(xhr.responseText))
    results = JSON.parse(xhr.responseText)
    results.forEach(function(result) {
      result.venues.forEach(function(venue) {
        console.log(venue.name, venue.location.locality, venue.location.address1)
        venue.menus.forEach(function(name) {
          console.log(name.menu_name)
          console.log(name.sections)
        });
      });
    });
  }

});


function venueSearch(name, zip) {
  theSearch = {};
  theSearch.name = name;
  theSearch.zip = zip;
  return theSearch;
}



// Type of route
// How to use the request module
// How to access the returned data
