window.createGame = function(scope, element, players, enemies, mapId, injector) {

    console.log(element);

    var ctx = element[0].getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(10,10,150,80);

    // Build game object
    //var width = parseInt(element.css('width'), 10),
    //    height = parseInt(element.css('height'), 10);
    var width = parseInt(500, 10),
        height = parseInt(300, 10);
    var game = new Phaser.Game(width, height, Phaser.AUTO, 'gameCanvas');

    // Load states
    var states = require('./helper/states').States;

    game.state.add('Boot', states.Boot);
    game.state.add('Preloader', states.Preloader);
    game.state.add('Play', states.Play);

    game.state.start('Boot');

    scope.$on('$destroy', function() {
        console.log("Game gets cleaned up.");
        game.destroy();
    })
};
