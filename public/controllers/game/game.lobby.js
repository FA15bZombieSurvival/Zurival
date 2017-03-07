angular.module('Zurival.game.lobby', [])
    .controller('LobbyCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.maps = [
            { _id: '58a581686ac37b3b848b7b36' },
            { _id: '58a59dfb6ac37b3b848b7b37' }
        ];

        //Getting active world instances from the server
        $http.get('/game/lobby')
            .success(function(data){
                console.log('Ctrl:getRequest ');
                console.log(data.worlds);
                $scope.worlds = data.worlds;
            })

        $scope.generateWorld = function(){
            $http.post('/api/generateWorld', $scope.maps[0])
                .success(function(data, status, header, config){
                    $scope.worlds.push(data);
                    console.log('Ctrl:generateWorld ');
                    console.log(data.worlds);
                })
                .error(function(data, status, header, config){
                    console.log("Error");
                });
        }
    }]);
