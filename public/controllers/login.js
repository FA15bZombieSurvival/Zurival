angular.module('Zurival')
    .controller('LoginCtrl', ['$scope', 'authentication', function($scope, authentication) {
        $scope.title = 'Login';

        $scope.login = function() {
            authentication.login({
                username: $scope.email,
                password: $scope.password
            });
        };
    }]);
