angular.module('Zurival.game.lobby', [])
    .controller('LobbyCtrl', ['$scope', '$http', 'authentication', function($scope, $http, authentication) {
        $scope.maps = [
            { _id: '58a581686ac37b3b848b7b36' },
            { _id: '58a59dfb6ac37b3b848b7b37' }
        ];

        //Getting active world instances from the server
        $http.post('/game/lobby', {userID: authentication.currentUser().id})//$window.localStorage["mean-token"])
            .success(function(data){
                $scope.worlds = data.worlds;
                $scope.characters = data.characters;
                console.log($scope.characters[0]);
            });

        $scope.generateWorld = function(){
            $http.post('/api/generateWorld', $scope.maps[0]) //TODO: Change this to from db
                .success(function(data, status, header, config){
                    $scope.worlds.push(data);
                })
                .error(function(data, status, header, config){
                    console.log("Error");
                });
        };

        $scope.generatePlayer = function(){
            $http.post('/api/generatePlayer', {
                character: $scope.characters[0],
                worldID: $scope.worlds[0]._id
            })
                .success(function(data, status, header, config){
                    console.log(data);
                    //$scope.worlds[worlds.length-1].addPlayer(data);
                })
                .error(function(data, status, header, config){
                    console.log("Error");
                });
        };

    }]);
