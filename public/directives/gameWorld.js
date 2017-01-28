angular.module('Zurival.game.game')
    .directive('gameCanvas', function($injector) {
        var linkedFunction = function(scope, element, attribute) {
            createGame(scope, element, scope.players, scope.enemies, scope.mapId, $injector);
        };

        return {
            restrict: 'A',
            scope: {
                players: '=',
                enemies: '=',
                mapId: '='
            },
            link: linkedFunction
        }
    });
