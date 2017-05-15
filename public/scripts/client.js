var myApp = angular.module('myApp', []);
// tried to config it broke my code.

// myApp.config(function($routeProvider, $locationProvider) {
// $routeProvider.when('/', {
//   template: 'views/index.html',
//   controller: 'movieController as mc'
// }).when('/search', {
//    templateUrl: 'views/index.html',
//    controller: 'MovieController'
// }).when('/favorite', {
//   templateUrl: 'views/pages/favorites.html',
//   controller: 'favController as fc'
// }).otherwise('/');
//
// $locationProvider.html5Mode(true);
// }); // end config

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
      return vm.movieArray;
    });

  }; // end getMovies

  vm.grabFavMovie = function (title, year, poster, imdbId) {
    console.log('grab favs');
    var objectToSend = {
      Title: title,
      Year: year,
      Poster: poster,
      imdbID: imdbId
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

}); // end favController
