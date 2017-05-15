var myApp = angular.module('myApp', ['ngRoute']);
// tried to config it broke my code.

myApp.config(function($routeProvider, $locationProvider) {
$routeProvider.when('/', {
  templateUrl: 'views/pages/default.html',
  controller: 'defaultController as dc'
}).when('/search', {
   templateUrl: 'views/index.html',
   controller: 'MovieController'
}).when('/favorite', {
  templateUrl: 'views/pages/favorites.html',
  controller: 'favController as fc'
}).otherwise('/');

$locationProvider.html5Mode(true);
}); // end config

myApp.controller('movieController', function($http){
  console.log('NG');



  // view model
  var vm = this;
  vm.movieArray = [];
  vm.getMovies = function () {
    console.log('getting movies');
    return $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?s=' + vm.searchIn,
    }).then(function success(response) {
      console.log('response ->', response);
      console.log('data ->', response.data);
      vm.movieArray = response.data.Search;
      // console.log('search results ->', movieArray.data.Search);
      vm.searchIn = ' ';
      return vm.movieArray;
    });

  }; // end getMovies

  vm.grabFavMovie = function (title, year, poster) {
    console.log('grab favs');
    var objectToSend = {
      title: title,
      year: year,
      poster: poster
    };
    console.log('movieToSend ->', objectToSend);

$http({
  method: 'POST',
  url: '/fav',
  data: objectToSend
}).then(function success(response) {
  console.log('this is the response', response);
});
}; // end grabFavMovie
}); // end movieController

myApp.controller('favController', function($http){
  console.log('ng');
  var vm = this;
  vm.favArray = [];

vm.getFavMovie = function () {
  console.log('getting favs');
  return $http({
    method: 'GET',
    url: '/fav'
  }).then(function success(response) {
    console.log('response from fav ->', response);
    vm.favArray = response.data;
    console.log('favArray ->', vm.favArray);
    return vm.favArray;
  })
}; // end getFavMovie
}); // end favController

myApp.controller('defaultController', function() {
  console.log('DefaultController loaded');
}); // end DefaultController
