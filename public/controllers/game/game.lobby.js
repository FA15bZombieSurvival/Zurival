angular.module('Zurival.game.lobby', [])
    .controller('LobbyCtrl', ['$scope', '$http', 'authentication', '$state', function($scope, $http, authentication, $state) {

        // This was used to generate example entries
        // $http.get('/api/generateSchema')
        //     .success(function(){
        //         console.log("Schema generated");
        //     })
        //     .error(function(){
        //         console.log("Not successful");
        //     });

        //Getting active world instances from the server
        $http.get('/game/lobby')
            .success(function(lobbys){
                $scope.lobbys = lobbys;
            });

        $scope.createLobby = function(){

            var lobbyname = $scope.lobbyname;
            var user = authentication.currentUser();

            $http.post('/api/createLobby', {
                lobbyname: lobbyname,
                user: user
            })
            .success(function(data, status, header, config){
                $state.go("root.game.create_game", {
                    lobbyname: lobbyname
                });
            })
            .error(function(data, status, header, config){
                console.log("Error in POST:createLobby");
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

        $scope.join = function(data){

            var lobbyname = data;

            $state.go("root.game.create_game", {
                lobbyname: lobbyname
            });
        };

    }]);
