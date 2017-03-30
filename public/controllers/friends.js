angular.module('Zurival')
    .controller('FriendsCtrl', ['$scope', '$http', 'authentication', function($scope, $http, authentication) {
        $scope.user = authentication.currentUser();
        $scope.allUsers = getAllUsers();
        function getAllUsers() {
            $http.post('/api/getUsers')
                .success(function(data) {
                    return data;
                })
                .error(function(err, status) {
                    console.log(err + ' ' + status);
                });
        }

        $scope.friends = function() {
            $http.post('/api/getFriends', {userID: authentication.currentUser().id})
                .success(function(data) {
                    console.log(data);
                    return data;
                })
                .error(function(err, status) {
                    console.log(err + ' ' + status);
                });
        };
    }]);
