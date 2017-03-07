angular.module('Zurival')
    .controller('NavigationCtrl', [ '$scope', 'authentication', function($scope, authentication) {
          $scope.test = 'Please login!';
          if(authentication.isLoggedIn()) {
              $scope.isLoggedIn = true;

          }
    }]);
