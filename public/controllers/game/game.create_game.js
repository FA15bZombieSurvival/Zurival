angular.module('Zurival.game.create_game', ['smart-table'])
    .controller('CreateGameCtrl', ['$scope', '$http', '$stateParams', 'authentication', function($scope, $http, $stateParams, authentication) {

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

        $http.get('/api/maps')
            .success(function(data){
                $scope.maps = data;
                $scope.chosenMap = $scope.maps[0];
            })
            .error(function(data, status){
                console.log("Error in GET:api/maps");
            });

        $scope.generateWorld = function(selectedMap){

            var mapId = selectedMap._id;

            $http.post('/api/createLobby', mapId)
                .success(function(data, status, header, config){
                    $scope.worlds.push(data);
                })
                .error(function(data, status, header, config){
                    console.log("Error in POST:api/generateWorld");
                });
        };

        //TODO: Refactor multiple usages in here and game.lobby.js
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
