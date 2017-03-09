angular.module('Zurival.game', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('root.game.lobby', {
                url: '/lobby',
                views: {
                    "content@": {
                        templateUrl: 'views/game/lobby.html'
                    }
                }
            })
            .state('root.game.create_game', {
                url: '/create_game',
                views: {
                    "content@": {
                        templateUrl: 'views/game/create_game.html'
                    }
                }
            })
            .state('root.game.game', {
                url: '/ingame',
                views: {
                    "content@": {
                        templateUrl: 'views/game/game.html'
                    }
                }
            })
    });
