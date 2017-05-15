var myApp = angular.module('myApp', []);

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

  vm.grabFavMovie = function () {
    console.log('grab favs');
    var objectToSend = {
      title: vm.movieArray.Title,
      year: vm.movieArray.Year,
      poster: vm.movieArray.Poster,
      id: vm.movieArray.imdbID
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

}); // end controller
