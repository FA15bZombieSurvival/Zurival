angular.module('Zurival')
    .controller('ProfileCtrl', ['$scope', '$window', 'authentication', function($scope, $window, authentication) {
        $scope.user = authentication.currentUser();
        $scope.loggedInUser = authentication.isLoggedIn();
        $scope.edit = function() {
            // Make inputs editable
            document.getElementById('username').removeAttribute('disabled');
            document.getElementById('usermail').removeAttribute('disabled');
            document.getElementById('submitProfileChanges').style.visibility = 'visible';
        };

        $scope.submitProfileChanges = function() {
            
        }
    }]);
