angular.module('Zurival.game', [])
    .config(function($stateProvider) {
        $stateProvider
            //These are the routes for the lobby 
            .state('root.game.lobby', {
                url: '/lobby',
                views: {
                    "content@": {
                        templateUrl: 'views/game/lobby.html',
                        controller: 'LobbyCtrl'
                    }
                }
            })
            .state('root.game.create_game', {
                url: '/lobby/create_game?lobbyname',
                views: {
                    "content@": {
                        templateUrl: 'views/game/create_game.html',
                        controller: 'CreateGameCtrl'
                    }
                }
            })
            .state('root.game.game', {
                url: '/ingame',
                views: {
                    "content@": {
                        templateUrl: 'views/game/game.html',
                        controller: 'GameCtrl'
                    }
                }
            })
    });
