angular.module('Zurival')
    .controller('ProfileCtrl', ['$scope', '$window', '$http','authentication',function($scope, $window, $http, authentication, user) {
        $scope.user = authentication.currentUser();
        $scope.currentName = $scope.user.username;
        $scope.loggedInUser = authentication.isLoggedIn();
        $scope.edit = function() {
            // Make inputs editable
            document.getElementById('username').removeAttribute('disabled');
            document.getElementById('usermail').removeAttribute('disabled');
            document.getElementById('submitProfileChanges').style.visibility = 'visible';
        };

        $scope.submitProfileChanges = function() {
            //authentication.update(document.getElementById('username').value);
            document.getElementById('username').setAttribute('disabled', 'disabled');
            document.getElementById('usermail').setAttribute('disabled', 'disabled');
            document.getElementById('submitProfileChanges').style.visibility = 'hidden';
            $http.post('/api/changeName')
                .success(function(data) {
                    console.log(data);
                    $scope.allUsers = data;
                })
                .error(function(err, status) {
                    console.log(err + ' ' + status);
                });
        }
    }]);
