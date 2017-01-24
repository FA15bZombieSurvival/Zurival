angular.module('Zurival')
    .controller('RegistrationCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {
        $scope.title = 'Registration';

        $scope.signup = function() {
            authentication.register({
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            });
        };
    }]);
