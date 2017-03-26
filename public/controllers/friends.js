angular.module('Zurival')
    .controller('FriendsCtrl', ['$scope', 'authentication', function($scope, authentication) {
        $scope.user = authentication.currentUser();
    }]);
