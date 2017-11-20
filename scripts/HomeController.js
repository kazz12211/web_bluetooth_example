app.controller('HomeController',
  function($scope, $location) {
    $scope.linkTo = function(path) {
  		$location.path(path);
  	};
  });
