var width = parseInt(window.innerWidth/1.1, 10),
    height = parseInt(window.innerHeight/1.7, 10);

window.game = new Phaser.Game(width, height, Phaser.AUTO, 'gameCanvas');
window.player = null;
window.socket = null;
window.map = null;
//window.TEXTURES = ;

//var createGame();
//window.createGame = function(scope, element, injector) {
window.createGame = function() {
  //socket muss hier rein
    socket = io("");
/*
    game.state.add('Boot', require("./game/states/Boot"));
    game.state.add('Preload', require("./game/states/Preload"));
    game.state.add('Game', require("./game/states/Game"));
    */
    game.state.add('Boot', Boot);
    game.state.add('Preload', Preload);
    game.state.add('Game', Game);

    game.state.start('Boot');
};
