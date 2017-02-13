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
            .state('root.game.game', {
                url: '/ingame',
                views: {
                    "content@": {
                        templateUrl: 'views/game/game.html'
                    }
                }
            })
    });
