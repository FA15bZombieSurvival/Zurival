angular.module('Zurival')
    .controller('RegistrationCtrl', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {
        $scope.title = 'Registration';

        $scope.signup = function(){
            authentication.register({
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            }, function(err){
                if(err){
                    if(err.indexOf("Err:User") !== -1){
                        $scope.userDup = "Username already taken";
                    }
                    if(err.indexOf("Err:Email") !== -1){
                        $scope.emailDup = "Email already taken";
                    }
                }else{
                    $location.path("/home");
                }
            });
        };
    }]);
