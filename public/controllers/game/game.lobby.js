angular.module('Zurival.game.lobby', [])
.controller('LobbyCtrl', ['$scope', '$rootScope', '$http', 'authentication', function($scope, $rootScope, $http, authentication) {
        $scope.maps = [
            { _id: '58a581686ac37b3b848b7b36' },
            { _id: '58a59dfb6ac37b3b848b7b37' }
        ];

        /*
        // TODO erst connecten, wenn man einer Lobby beigetreten ist.
        $rootScope.lobbySocket = io.connect('/lobby', {
            'query': 'token=' + authentication.getToken()
        });

        //Getting active world instances from the server
        $http.get('/game/lobby')
            .success(function(lobbys){
                $scope.lobbys = lobbys;
            });

        //Creates a lobby instance and forwards the user to the lobby
        //which triggers the joinLobby route and joins the user
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

        //Just forwards the player to the lobby
        $scope.join = function(data){

            var lobbyname = data;

            $state.go("root.game.create_game", {
                lobbyname: lobbyname
            });
        };*/

    }]);
