angular.module('Zurival')
    .controller('FriendsCtrl', ['$scope', '$http', 'authentication', function($scope, $http, authentication) {
        $scope.user = authentication.currentUser();
        $scope.allUsers = authentication.allUsers();

        $scope.friends = function() {
            $http.post('/api/getFriends', {userID: authentication.currentUser().id})
                .success(function(data) {
                    console.log(data);
                    return data;
                });
        };
    }]);
