//API CALL FOR BY ID, RETRIEVES VENUE NAME, LOCATION, CONTACT INFO
/**
curl -X POST https://api.locu.com/v2/venue/search -d '{
  "api_key" : "1964ce6a674c2fdc5e1e27567e5add82e755046a",
  "fields" : [ "name", "location", "contact" ],
  "venue_queries" : [
    {
      "locu_id" : "5e69999f995c8ad54379"
    }
  ]
}'

curl -X POST https://api.locu.com/v2/venue/search -d '{
  "api_key" : "1964ce6a674c2fdc5e1e27567e5add82e755046a",
  "fields" : [ "name" ],
  "venue_queries" : [
    {
      "location" : {
        "postal_code": "92662"
      },
      "name" : "Basilic"
    }
  ]
}'


RETRIEVES ENTIRE MENU
curl -X POST https://api.locu.com/v2/venue/search -d '{
  "api_key" : "1964ce6a674c2fdc5e1e27567e5add82e755046a",
  "fields" : [ "name", "location", "menus" ],
  "venue_queries" : [
    {
      "locu_id" : "5e69999f995c8ad54379"
    }
  ]
}'

// Call to LOCU http -v get https://api.locu.com/v1_0/venue/search/?api_key=1964ce6a674c2fdc5e1e27567e5add82e755046a



// Old Code--Destroy when sure not needed

app.post('/restaurants', function(req, res) {
  restaurants.forEach(function(restaurant) {
    if(req.body.name == restaurant.name) {
      console.log(restaurant.name)
      restaurant.menu.forEach(function(item) {
        console.log(item)
      })
    }
  })
  res.send()
})
**/

var term = {};
term.name = req.body.name;
term.zip = req.body.zip

*****************MOCK DATA AND ROUTE************************
/**
var restaurants = [
  { name: 'Beachcomber-Cafe', menu: ['chips & guac', 'chips & salsa']},
  { name: 'Wilmas', menu: ['steak and eggs', 'island favorite omelette']},
  { name: 'Chipotle', menu: ['green eggs & ham']},
  { name: 'McDonalds', menu: ['big mac']}
]

app.get('/restaurants/:name', function(req, res) {
  restaurants.forEach(function(restaurant) {
    if(req.params.name == restaurant.name) {
      console.log(restaurant.name)
      restaurant.menu.forEach(function(item) {
        console.log(item)
      });
    }
  });
  res.send()
})
**/

var newRestaurants = {id: "Basilic Restaurant"}

/**
app.get('/restaurant/:id', function(req, res) {
  if(req.params.id == newRestaurants.id) {
    restaurantSearch(newRestaurants.id)
  }
  res.send()

});
**/


************************DESIGN************************
<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search for..." id="search-old">
        <span class="input-group-btn">
          <button class="btn btn-default" id="search-button-old" type="button">Restaurant</button>
        </span>
      </div><!-- /input-group -->
    </div><!-- /.col-lg-6 -->
  </div>




  /**
  app.post('/restaurants', function(req, res) {
    var term = {};
    term.name = req.body.name;
    term.zip = req.body.zip
      restaurantSearch(term.name, term.zip)
      res.send(results)

  });

  var results = []
  function restaurantSearch(name, zip) {
    request({
        url: 'https://api.locu.com/v2/venue/search',
        json: {
          "api_key" : "f165c0e560d0700288c2f70cf6b26e0c2de0348f",
          "fields" : [ "name", "contact"],
          "venue_queries" : [
            {
              "name" : name,
              "location" : {
                "postal_code" : zip
              }
            }
          ]
        },
        method: 'POST' //Specifies method (requirement from API page)
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            results.push(body)
            console.log(results + 'RESULTS')
            console.log(response.statusCode, JSON.stringify(body));
        }
    });
  }


  app.listen(8080);

  **/


*********************** RIGHT AFTER NEW ROUTING FROM POST TO GET
var fakeButton = document.getElementById('fake-button');
fakeButton.addEventListener('click', function() {
  theFakeSearch = {}
  theFakeSearch.name = 'Wilma'
  theFakeSearch.zip = '92663'
  console.log('success')
  var xhr = new XMLHttpRequest();
  //xhr.open('GET','/testing-query/?name=Wilma&zip=92662');
  xhr.open('GET', 'testing-query/?name=' + theFakeSearch.name + '&' + 'zip=' + theFakeSearch.zip)
  //xhr.setRequestHeader('Content-Type', 'application')
  //xhr.send('localhost:8080/testing-query/?name=Wilma&zip=92662')
  xhr.send()
})


function venueSearch(name, zip) {
  theSearch = {};
  theSearch.name = name;
  theSearch.zip = zip;
  return theSearch;
}

app.get('/testing-query/', function(req, res) {
  if((req.query.name == 'Wilma') && (req.query.zip == '92662')) {
    console.log('success')
  }
  console.log(req.query)
  res.send()
})


,Hors D'oeures & Appetizers​,Trio of Chef's Choice Charcuterie,Assortment of Imported Cheeses,Traditional Swiss Raclette Cheese,Viande Sechee "Bunderfleish",Fresh Seasonal Blue Crab,Beef Tenderloin Steak Tartar,Seared “Molard” Duck Foie Gras,Soupe Du Jour,Soupe À L`Oignon,Salade Maison,Salade Chevre Chaude,Entree (Main Course)​,Basilic Bouillabaisse,Seafood Risotto,Baked New Zealand Grouper Filet,Saint Pierre en Croute d`Epice,Duo of Scallops and Mexican White Shrimps,Coq Au Vin,Steak au Poivre,Emince de Veau Zurichois,Carre d`Agneau,Magret de Canard,Desserts​,Ice-Cream Trio,Caramelized Pecan Walnut Chocolate Tart with a Creme Anglaise,Seasonal Mixed Berries,Creme Brulee,Assortment of Tropical Sorbets,Tarte Tatin,Imported European Cheese Platter,,,,,,Featuring Daily Specials​,Soup du Jour,Special Salade,Special Fish,Champagne Sorbet Palette Refresher,Special Viande,Dessert Trio,,,Wine by the Glass​,Heidseick and Co, Monopole Epernay, Champagne, France, NV,Les Deux Tours, Sauvignon Blanc, Loire Valley, France, `05,Kenneth Volk, Chardonnay, Santa Maria, California, `05,Spatburgunder, Dry Pinot Noir, Pfaltz, Germany,`05,Cases Barranca, Syrah (ORGANIC), Santa Barbara, California, `06,Chateau Belles-Cimes, Bordeaux Blend, Bordeaux, France, `04,Martin Ray, Cabernet Sauvignon, Napa Valley, California `05,Meola, Vino Bello, Bordeaux Blend, Anderson Valley, California, `03,Wines by the Half Bottle​,Louis De Sacy, Grand Cru, Reims, Champagne, France, NV,,Pouilly-Fume, La Doucette, Central Vnyrds, Loire Valley, France,`04,,Chassagne Montrachet, Domaine Pillot, Burgundy, Fr,`04,Trefethen, Oak Knoll District, Napa Valley, California,`04,,Baileyana, Grand Firepeak Cuvee, Edna Valley, California,`05,Nuits St Georges, Domaine Moillard, Cote de Nuit, Burgundy, Fr,`04,,Chateau Yon Figeac, St. Emilion, Bordeaux, France,`00.,Chateau Monbousquet, St Emilion, Bordeaux, France,`03,Chateauneuf du Pape, Dom. Pere Caboche, Rhone Valley, France,`03,New World Wines​,Scharffenberger, Brut, Anderson Valley, NV,Roederer, Estate L`Ermitage, Brut Anderson Valley, NV, `00,Whitehaven, Sauvignon Blanc, Malborough, New Zealand, `07,Brander, Sauvignon Blanc, "Cuvee Nicholas", Santa Ynez,`06,Raymond, Reserve, Chardonnay, Napa Valley,`05,Signorello, Vielles Vignes, Chardonnay, Napa Valley,`05,Far Niente, Chardonnay, Napa Valley,`06.,Kenneth Volk, Chardonnay, Santa Maria, '05,Domaine Drouhin "Arthur", Chardonnay, Willamette Valley, Oregon,`06,Domaine Drouhin, Pinot Noir, Willamette Valley, Oregon,`06,Emeritus, Pinot Noir, Russian River,`05,Casa Barranca, Pinot Noir (ORGANIC), Arroyo Grande Valley,`07,Nickel and Nickel, Suscol Ranch, Merlot, Napa Valley,`04,Dry Creek, Bullock House, Merlot, Sonoma County,`02,Couchant, Cabernet Franc Thompkin Cellars, Santa Barbara,`04,Raymond Generation, Cabernet Sauvignon, Napa Valley,`00,Far Niente, Cabernet Sauvignon, Napa Valley,`03,Halo, Trefethen, Cabernet Sauvignon, Napa Valley,`02,Justin, Cabernet Sauvignon, Paso Robles,`05,Martin Ray, Cabernet Sauvignon, Napa Valley,`05,Brander Bouchet, Meritage, Santa Ynez Valley,`05,Justin Isosceles, Meritage, Paso Robles,`04,Cain Concept, Meritage, Napa Valley,`00.,Dominus, Meritage Napa Valley,`01.,Peachy Canyon, Westside, Zinfandel, Paso Robles,`06,Baileyenna Firepeak Vineyard, Syrah, Edna Valley,`04,Fetish The Watcher, Shiraz, Barossa Valley, Australia,`05,Old World Wines​,Deutz, Rose Ay, Champagne, France,`03.,Heidsieck and Co, Monopole, Epernay, Champagne, France, NV,Louis Roederer, Brut Premier, Reims, Champagne, France, NV,Louis Roederer, Cristal, Reims, Champagne, France,`99,,Fendant les Murettes, Robert Gillard, Cantons du Vallais, Swiss,`06,Aigle les Murailles, Henri Badoux, Cantons de Vaud, Swiss,`06,,Sancerre, Domaine des Grandes Perrieres, Central Vynd, Loire Valley, Fr,`06,Pouilly-Fume, La Doucette, Central Vnyd, Loire Valley, Fr,`05,,Macon Vinzelles, Caves des Grand Crus Blancs, Maconnais, Burgundy, Fr,`06,Pouilly Fuisse, Joseph Drouhin Maconnais, Burgundy, France,`05,Meursault, Clos Marguerite, Domaine Caillot, Cote de Beaune, Burgundy, Fr,`04,Chassagne Montrachet, Jean Claude Bachelet, Cote de Beaune, Burgundy, Fr,`05,Puligny Montrachet, Jean Charton, Folatieres, Cote de Beaune, Burgundy, Fr,`04,Chablis, 1er Cru, Montmains, William Fevre, Cote de Beaune, Burgundy, Fr,`04,Corton Charlemagne, Grand Cru, Alex Gambal, Cote de Beaune, Burgundy, Fr,`06,Riesling Kabinneett, Bert Simon, Mosel Saar, Germany,`04,Gewurztraminer, Fleur, Dmne Schlumberger, Alsace, France,`05,,Dole des Monts, Cantons du Valais, Switzerland,`06,,Savigny les Beaunes, Domaine Moillard, Cote de Beaune, Burgundy, Fr,`05,Beaunes Du Chateau, 1er Cru Domain Bouchard, Cote de Beaune, Burgundy, Fr,`05,Cote de Nuit Villages, Domaine A. Gille, Cote de Nuit, Burgundy, France,`05,Chambolle-Musigny, 1er Cru Domaine Gille, Cote de Nuit, Burgundy, France,`03,Gevrey Chambertin, Domaine Marc Roi, Cote de Nuit, Burgundy, France,`04,Echezeaux Grand Cru J L Agerter, Cote de Nuit, Burgundy, France, '02,,Cote-Rotie, Brune et Blonde, E.Guigal, Northern Rhone Valley, France,'03,Chateauneuf du Pape, Domaine La Charbonniere, Southern Rhone Valley, France,`03,Chateauneuf du Pape, Clos des Papes, Southern Rhone Valley, France,'04,Cote du Rhone Villages, Domne Grosset, Southern Rhone Valley France,`04,Gigondas, Domaine Grand Romane, Southern Rhone Valley, France,'05,Vacqueyras, Grande Garrigue, Alain Jaume, Southern Rhone Valley, France,'04,,Chateau Le Caillou, Pomerol, Bordeaux, France,`00,Chateau Bellisle Mondotte, Saint Emilion, Bordeaux, France,`01,Chateau Le Prieure, Saint Emilion, Bordeaux, France,`01,Chateau La Dominique, Saint Emilion, Bordeaux, France,`98,,Chateau De Pez, Saint Estephe, Bordeaux, France,`02,Chateau Lynch Bages, Pauillac, Bordeaux, France,`03,Chateau Dhuart Milon, Paullac, Bordeaux, France,`00,Chateau Lalande-Borie, Saint Julien, Bordeaux, France,`03,Chateau Branaire Du Cru, Saint Julien, Bordeaux, France,`00,Chateau Leoville Las Cases, Saint Julien, Bordeaux, France,`98.,Chateau Larrivet Haut Brion, Pessac Leognan, Bordeaux, France,`00,Chateau Mission Haut Brion, Pessac Leognan, Bordeaux, France,`98,Chateau Prieure Lichine, Maragaux, Bordeaux, France,`00,Chateau Mongravey, Margaux, Bordeaux, Fr,`02,Champagne Cocktails​,Kir Royal, Traditional Style Champagne, Blackcurant Cream,Basilic Kir, Champagne Strawberry Liquor, Basil,Ports & Sauternes​,Graham,Ramos Pinto,Croft Port,Cockburn’s Port,Chateau De Rayne-Vigneau

/**
function displayMenu(mealTypes) {
  var sectionTitle = document.createElement('div');
  sectionTitle.textContent = mealTypes;

  var menuContainer = document.getElementsByClassName('hide-menu');
  menuContainer.classList.remove('hide-menu');
  menuContainer.classList.add('show-menu')

}
**/

/**
var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', function() {
  var hideResults = document.getElementsByClassName('show')[0];
  hideResults.classList.remove('show');
  hideResults.classList.add('hide-results');
});
**/

/**
var newSection = document.getElementsByClassName('hide-results')[0]
newSection.classList.remove('hide-results')
newSection.classList.add('show')
newSection.appendChild(theEntireMenu)
};
});
**/



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


/**
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
**/

/**
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
**/


/**
var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', function() {
  var sectionTitle = document.createElement('div');
  sectionTitle.textContent = mealTypes;
  var menuContainer = document.getElementsByClassName('hide-menu')[0];
  menuContainer.classList.remove('hide-menu');
  menuContainer.classList.add('show-menu')

  menuContainer.appendChild(sectionTitle)
});
**/

/**
function displayHeaders(headers) {
  var sectionTitle = document.createElement('div');
  sectionTitle.textContent = headers;
  var menuContainer = document.getElementsByClassName('hide-menu')[0];
  menuContainer.classList.remove('hide-menu');
  menuContainer.classList.add('show-menu')

  menuContainer.appendChild(sectionTitle)
}
**/

function hideSearch() {
  var hideSearchBox = document.getElementsByClassName('view-search')[0];
  hideSearchBox.classList.remove("view-search");
  hideSearchBox.classList.add("hide-search");
}


/**
function theChoiceButton() {
  var theChoiceButton = document.createElement('button');
  theChoiceButton.setAttribute('class', 'btn btn-default');
  theChoiceButton.setAttribute('id', 'submit-options')
  theChoiceButton.textContent = 'Relax!'
  return theChoiceButton
}
**/

/**
    var theEntireMenu = document.createElement('div');
    theEntireMenu.setAttribute('class', 'col-md-8 list-group form')
    theEntireMenu.setAttribute('id', 'vote-form')
    theEntireMenu.appendChild(theLocation);
    var voteButton = document.createElement('button')
    voteButton.setAttribute('class', 'btn btn-primary')
    voteButton.textContent = 'Get some help!'
    theEntireMenu.appendChild(voteButton)
**/

//switchClass(hide, 'view-search', 'hide-search')

/**
var checkedOption = []
document.getElementsByClassName('view')[0].addEventListener('click', function(e) {
  var theOption = e.target
  if(theOption.className == 'option') {

    checkedOption.push(document.querySelector('.option:checked').value)
    console.log(checkedOption)
    }
})
**/


var users = [
  {
    name: 'Doug',
    password: 1234,
    choices: [
      { items: [] }
      { items: [], count: [3]}
    ]
  },
  {
    name: 'Bob',
    password: 5678,
    choices: [
      { items: [], count: [3] },
      { items: [], count: [8] }
    ]
  },
]

module.exports = users;




/**
app.post('/choices/', function(req, res) {
  users.forEach(function(user) {
    user.choices.forEach(function(item) {
      if(userID.id == user.name) {
        console.log(userID.id)
        item.items = req.body
        console.log(item.items)
        }
      });
    });
  res.send()
});
**/

users.forEach(function(user) {
  user.choices.forEach(function(item) {
    if(userID.id == user.name) {
      console.log(userID.id)
      item.items = req.body
      console.log(item.items)
      }
    });
  });
res.send()
});


app.post('/choices/', function(req, res) {
  //console.log(req.body)
  userID.forEach(function(userName) {
    users.forEach(function(name) {
      if(userName == name.name) {


        name.choices.forEach(function(item) {
          if(userName == name.name) {
            item.items = req.body
            console.log(item.items)
            //console.log(item.items)
            //console.log(name.name, name.choices)
          }
        });
     }
   })
  });
    res.send()
});


/**
theArea.addEventListener('click', function(e) {
  var voteLink = e.target;
  if(voteLink.id == 'view-votes') {
    switchClass(theArea, 'view', 'hide')
    votePage(checkedOption)

  }
})
**/

/**
document.getElementById('header').addEventListener('click', function(e) {
  var theLink = e.target;
  if(theLink.id == 'view-votes')

})
**/

/**
var searchAgain = document.getElementById('click');
searchAgain.addEventListener('click', function() {
  var hideResults = document.getElementsByClassName('show')[0];
  hideResults.classList.remove('show');
  hideResults.classList.add('hide-results');
  showSearch()
});
**/

/**
user.post('/:user', function(req, res) {
  console.log(req.params)
  profiles.forEach(function(user) {
    if(req.params.user !== user.name) {
      console.log('does not match')
      var newUser = req.params.user
      user.name == newUser
      profiles.push(newUser)
      console.log(user)
    }
  })

  res.send()
});
**/

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
      /**
      if(xhr.responseText) {
        var login = document.getElementsByClassName('login')[0]
        switchClass(login, 'login', 'hide-login')

        var theSearch = document.getElementsByClassName('hide')[0]
        switchClass(theSearch, 'hide', 'view')

        viewVotes();
        console.log(xhr.responseText)
      }
      **/
    }

  }




  /**
  xhr.onload = function() {
    if(xhr.responseText == name) {
      var login = document.getElementsByClassName('login')[0]
      switchClass(login, 'login', 'hide-login')

      var theSearch = document.getElementsByClassName('hide')[0]
      switchClass(theSearch, 'hide', 'view')

      viewVotes(); // Loads 'Pending Votes' linkt to navbar

      session.id = xhr.responseText
    }
  }
  **/
})



function verifyUser(response) {
//  var xhr = new XMLHttpRequest();
  //  xhr.open('POST', '/login/check/');
    //xhr.send();

    //xhr.onload = function() {
      if(response) {
        var login = document.getElementsByClassName('login')[0]
        switchClass(login, 'login', 'hide-login')

        var theSearch = document.getElementsByClassName('hide')[0]
        switchClass(theSearch, 'hide', 'view')

        viewVotes();
        //console.log(xhr.responseText)
      }
    //}
}

window.addEventListener('load', function() {
  var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login/check/');
    xhr.send();

    xhr.onload = function() {
      verifyUser(xhr.responseText)
      /**
      if(xhr.responseText) {
        var login = document.getElementsByClassName('login')[0]
        switchClass(login, 'login', 'hide-login')

        var theSearch = document.getElementsByClassName('hide')[0]
        switchClass(theSearch, 'hide', 'view')

        viewVotes();
        console.log(xhr.responseText)
      }
      **/
    }
})

/**
app.post('/login', function(req, res) {
  profiles.forEach(function(user) {
    if((req.body.name == user.name) && (req.body.password == user.password)) {
      userID.push(req.body.name)
      //userID.id = req.body.name
      //userID.name = req.body.name
      res.send(user.name)
    }
  });
});
**/

/**
theArea.addEventListener('click', function(e) {
  var submitVote = e.target;
  if(submitVote.id == 'vote-button') {

    votePage(checkedOption)
    checkedOption.push(userName)

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
**/


/***********CURRENT WORKING****************/
// Loads selected items to new vote page
/**
theArea.addEventListener('click', function(e) {
  var submitVote = e.target;
  if(submitVote.id == 'vote-button') {

    votePage(checkedOption)
    checkedOption.push(userName)

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
**/

/**
// Will be removed
// Should place selected items from menu in corresponding user object
app.post('/choices/', function(req, res) {
  console.log(req.body)
  //console.log(req.body)
  userID.forEach(function(userName) {
    profiles.forEach(function(name) {
      if(userName == name.name) {
        name.choices.forEach(function(item) {
            item.items = req.body // Need unique identifier for menu choices
            console.log(item.items)
            //console.log(item.items)
            //console.log(name.name, name.choices)
            var theChoice = {}
            theChoice.item = item.items
            theChoices.splice(0, 1)
            theChoices.push(theChoice)
        });
     }
   })
  });
    res.send(theChoices)
});
**/

//console.log(pendingMeals)
/**
theMeals.forEach(function(item) {
  console.log(item)
  mealOptions.poster = item.name;
  mealOptions.selection.first.dish = item.primary
  mealOptions.selection.first.dish = item.secondary
  //console.log(mealOptions.poster)


})
   **/
//console.log(mealOptions)



/**
 //console.log(req.body)
 theMeals.push(req.body)
 //console.log(theMeals)
 theMeals.forEach(function(dish){
   //console.log(dish)
   dish.forEach(function(item) {
     //console.log(item)
     mealOptions.poster = item.name


   })

 })

 //mealOptions.poster = req.body.poster;
 //mealOptions.selection.first = req.body.dish1;
 //mealOptions.selection.second = req.body.dish2;
 //console.log(mealOptions)
 console.log(mealOptions)
**/


var mealItems = []
theVoteOptions = []
theArea.addEventListener('click', function(e) {
  var voteLink = e.target;
  if(voteLink.id == 'view-votes') {
    //console.log(theVoteOptions)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/meals')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send()

    xhr.onload = function() {
      //console.log(xhr.responseText)
      mealItems.push(JSON.parse(xhr.responseText))
      //console.log(mealItems)
      mealItems.forEach(function(item) {
        console.log(item.poster, item.selection.first, item.selection.second, item.selection.third)


      })
      newVotePage(mealItems)
    }
/**
    theVoteOptions.forEach(function(item) {
      console.log(item)
      console.log(item.item)
    });
**/
    switchClass(theNewArea, 'hide', 'votes')
    //votePage(checkedOption)

  }
})


/**
var mealOptions = {
  poster: 'Abe',
    selection: {
      dishes: { dish: 'Pizza'},
      second: { dish: 'Hamburger' }
    },
  poster: 'John',
    selection: {
      first: { dish: 'Spaghetti'},
      second: { dish: 'Rigatoni' },
    }
}
**/



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



Get Menus before turning into router
/**
app.get('/restaurants/', function(req, res) {
  var results = []
  request({
      url: 'https://api.locu.com/v2/venue/search',
      json: {
        "api_key" : "f165c0e560d0700288c2f70cf6b26e0c2de0348f",
        "fields" : [ "name", "contact", "location", "menus"],
        "venue_queries" : [
          {
            "name" : req.query.name,
            "location" : {
              "postal_code" : req.query.zip
            }
          }
        ]
      },
      method: 'POST' //Specifies method (requirement from API page)
  }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          results.splice(0, 1)
          results.push(body)
          console.log(response.statusCode);

          res.send(results)
      }
  });
  console.log(req.query)
});
**/


ISSUES & PLANS
// User searches for venue by name & location
// If matched, returns container with venue name and location
// When user clicks, locu id loads entire menu


/** Functionality
1. User can search restaurants & view menu
2. User can braodcast a vote
3. User can respond to broadcast by voting.
  - How to handle notifications? (sms via twilio?)
5. Users can make friend circles.
6. User can broadcast to a specific circle.
7. User can gain badges/reputation. (Quick responder, accurate, loose cannon)

8. Score menu items based on past votes.
**/


VOTES POST ROUTE
// To be removed
app.post('/vote', function(req, res) {
  profiles.forEach(function(item) {
    item.choices.forEach(function(food) {
      food.items.forEach(function(dish) {
        if(req.body.food == dish) {
          console.log('ONE VOTE FOR ' + dish)
        }
      })
    })
  })

  res.send()
})


MEALS ROUTE BEFORE CLEANING UP
var express = require('express')
var profiles = require('./profiles.js')
var meals = express.Router();
var cookieParser = require('cookie-parser')();
var jsonParser = require('body-parser').json();
var trackingId = require('./trackingId.js')
var session = require('./session.js');
var userSessions = require('./user-sessions.js')

meals.use(jsonParser)

var pendingMeals = []

var mealOptions = {
  poster: 'Abe',
    selection: [],
    votes: { }
}


var theMeals = []
meals.post('/', function(req, res) {
 //console.log(mealOptions)
 //console.log(mealOptions.selection.first.dish)
 theMeals.push(req.body)
// console.log(req.body)
 //console.log(theMeals)

 //console.log(theMeals)
 theMeals.forEach(function(items) {
   //console.log(items)
   items.forEach(function(dish) {
     //console.log(dish.dish, dish.name)
     mealOptions.selection.push(dish.dish)
     mealOptions.poster = dish.name
   })

/**   //console.log(items)
   items.forEach(function(dishes) {
     //mealOptions.selection.first = dishes.first;
     //mealOptions.selection.second = dishes.second;
     //mealOptions.selection.third = dishes.third;
     //mealOptions.selection.fourth = dishes.fourth;
     //mealOptions.selection.fifth = dishes.fifth;
      mealOptions.poster = dishes.name;
      mealOptions.selection.forEach(function(item) {
        item.dish = dishes;
      })
   })
**/
 })
//console.log(mealOptions)
res.send(mealOptions)

})

meals.get('/', function(req, res) {
  //console.log(pendingMeals)
  //console.log(mealOptions)
  //res.send(theMeals)
  console.log(mealOptions)
  res.send(mealOptions)
})



module.exports = meals;


ORIGINAL METHOD FOR SENDING OPTIONS TO BACKEND
/**
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
**/

VOTES DATA STRUCTURE

/**
var options = [
  {
    voteItems:
    {
      dish: 'Salad',
      rating: [1],
      id: 'marco'
    }
  },
  {
    voteItems:
    {
      dish:
      rating:
      id:
    }
  }
]
**/
/**
req.params.voteItems
req.params.dish
req.params.rating
req.params.id
**/


// Creates a page that displays selected menu items for vote
// Creates a page that displays selected menu items for vote
function newVotePage(items) {
  var voteContainer = document.createElement('div');
  voteContainer.setAttribute('class', 'panel panel-default')
  voteContainer.setAttribute('id', 'vote-container')
  items.forEach(function(item) {
    var posterName = document.createElement('div');
    posterName.textContent = item.poster + ' is PANICKING!';
    posterName.setAttribute('class', 'panel-heading')
    voteContainer.appendChild(posterName)
    console.log(item.poster)
    item.selection.forEach(function(dishes) {
      dishes.forEach(function(dish) {
        var itemBox = document.createElement('div')
        //itemBox.setAttribute('class', 'panel panel-default col-xs-3');
        itemBox.setAttribute('class', 'panel-body')
        itemBox.textContent = dish
        itemBox.setAttribute('id', 'result-boxes');
        //itemBox.setAttribute('data-id', session.id)

        voteContainer.appendChild(itemBox)

        var voteSelector = document.createElement('input');
        voteSelector.setAttribute('type', 'radio')
        voteSelector.setAttribute('class', 'pull-right')
        voteSelector.setAttribute('id', 'the-vote')
        voteSelector.setAttribute('name', 'vote')
        voteSelector.setAttribute('value', dish)
        itemBox.appendChild(voteSelector);
        //document.getElementsByClassName('view-vote')[0].appendChild(itemBox)
      })


    })
    console.log(item.poster, item.selection.first, item.selection.second, item.selection.third)
    //var itemBox = document.createElement('div')
    //itemBox.setAttribute('class', 'panel panel-default col-xs-3')
    //itemBox.textContent = item.selection.first + item.selection.second + item.selection.third
    //itemBox.setAttribute('id', 'result-boxes')
    //itemBox.setAttribute('data-id', session.id)

    //document.getElementsByClassName('view-vote')[0].appendChild(itemBox)

})

// User logs in
// User searches for menu
// User selects menu items and broadcasts votes
// Second user overwrites the existing menu choices
// Can't broadcast global vote
