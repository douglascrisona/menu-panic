var button = document.getElementById('search-button');

button.addEventListener('click', function(e) {
var searchTerm = document.getElementById('search')
var searchZip = document.getElementById('postal')



  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/restaurants/?name=' + searchTerm.value + '&' + 'zip=' + searchZip.value );
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send();

  xhr.onload = function() {
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


// Type of route
// How to use the request module
// How to access the returned data
