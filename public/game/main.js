window.createGame = function(scope, element, injector) {

    // Build game object
    //TODO: Change width and height dynamically
    var width = parseInt(window.innerWidth/1.1, 10),
        height = parseInt(window.innerHeight/1.7, 10);
    var game = new Phaser.Game(width, height, Phaser.AUTO, 'gameCanvas');

    game.state.add('Boot', Boot);
    game.state.add('Preload', Preload);
    game.state.add('Game', Game);

    game.state.start('Boot'); 
};
