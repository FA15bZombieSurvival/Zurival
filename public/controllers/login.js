angular.module('Zurival')
    .controller('LoginCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {
        $scope.title = 'Login';

        $scope.login = function() {
            authentication.login({
                username: $scope.email,
                password: $scope.password
            }, function(err){
                if(err){
                    if(err.indexOf("Err:User") !== -1)
                        $scope.userNotFound = "Email/User not found";
                    if(err.indexOf("Err:Password") !== -1)
                        $scope.wrongPassword = "Wrong password";
                }else{
                    $location.path("/home");
                }
            });
        };
    }]);
