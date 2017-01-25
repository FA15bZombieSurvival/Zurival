angular.module('Zurival')
  .controller('ProfileCtrl', ['$scope', '$rootScope', 'Show', function($scope, $rootScope, Show) {
      $scope.subshows = Show.query({subscribers: $rootScope.currentUser._id});
    }]);
