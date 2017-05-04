angular.module('Zurival.game.create_game', ['smart-table'])
    .controller('CreateGameCtrl', ['$scope', '$http', '$stateParams', 'authentication', function($scope, $http, $stateParams, authentication) {

        //Retrieves the lobbyname from the URL and lets the player join.
        $http.get('/game/lobby/create_game/'+$stateParams.lobbyname)
            .success(function(lobby){

                $scope.lobby = lobby;

                $http.post('/api/joinLobby', {
                        lobby: $scope.lobby,
                        user: authentication.currentUser()
                    })
                    .success(function(data){
                        $scope.users = data.players;
                        console.log("Player joined");
                        console.log(data.players);
                    })
                    .error(function(data, status, header, config){
                        console.log("Error in POST:api/joinLobby");
                    });
            })
            .error(function(data, status, header, config){
                console.log("Error in GET:game/create_game");
            });

        //Gets the maps from the database
        $http.get('/api/maps')
            .success(function(data){
                $scope.maps = data;
                $scope.chosenMap = $scope.maps[0];
            })
            .error(function(data, status){
                console.log("Error in GET:api/maps");
            });

        //Starts the game
        $scope.generateWorld = function(selectedMap){

            clearTimeout(refreshTimeout);

            var mapId = selectedMap._id;

            $http.post('/api/createLobby', mapId)
                .success(function(data, status, header, config){
                    console.log("Game started");
                })
                .error(function(data, status, header, config){
                    console.log("Error in POST:api/generateWorld");
                });
        };

        //Basic structure for player generation on game start
        //This actually got moved and remains here for debugging purposes
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

        var refreshTimeout = setTimeout(() => window.location.reload(), 3000);

    }]);
