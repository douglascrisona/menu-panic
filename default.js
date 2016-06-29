var button = document.getElementById('search-button');

button.addEventListener('click', function(e) {
var searchTerm = document.getElementById('search')
  restSearch = venueSearch(searchTerm.value)
  console.log(restSearch)


  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/restaurants/');
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(restSearch))
  console.log(restSearch)
/**
  xhr.onload = function() {
    console.log(xhr.responseText)
  }
**/

});


function venueSearch(name) {
  theSearch = {};
  theSearch.id = name;
  return theSearch;
}
