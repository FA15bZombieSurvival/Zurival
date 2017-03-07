angular.module('Zurival')
  .controller('ProfileCtrl', ['$scope', 'authentication', function($scope, authentication) {
    $scope.user = authentication.currentUser;
  }]);
