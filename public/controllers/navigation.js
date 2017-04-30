angular.module('Zurival')
    .controller('NavigationCtrl', [ '$scope', '$location', 'authentication', function($scope, $location, authentication) {
          $scope.test = 'Please login!';
          if(authentication.isLoggedIn()) {
              $scope.isLoggedIn = true;
          }

          $scope.logout = function() {
              authentication.logout();
              $scope.isLoggedIn = false;
              $location.path("/home");
          }
    }]);
