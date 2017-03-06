angular.module('Zurival.game.game')
    .directive('gameCanvas', function($injector) {
        var linkedFunction = function(scope, element, attribute) {
            createGame(scope, element, $injector);
        };

        return {
            restrict: 'A',
            scope: {},
            link: linkedFunction
        }
    });
