angular.module('Zurival')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'authentication', function($rootScope, $scope, $location, authentication) {
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
                    $rootScope.isLoggedIn = true;
                    $rootScope.socket = io.connect('http://localhost:3000/chat', {   // TODO change Website
                        'query': 'token=' + authentication.getToken(),
                        'reconnection': true,
                        'reconnectionDelay': 500,
                        'reconnectionAttempts': 10
                    });
                    $location.path("/home");
                }
            });
        };
    }]);
