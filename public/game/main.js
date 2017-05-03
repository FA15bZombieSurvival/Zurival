var width = parseInt(window.innerWidth/1.1, 10),
    height = parseInt(window.innerHeight/1.7, 10);

window.game = new Phaser.Game(width, height, Phaser.AUTO, 'gameCanvas');
window.player = null;
window.enemy = null;
window.map = null;

createGame();

function createGame() {
    //There seems to be many errors with the websockets
    //socket = io("http://localhost:3000");
    //Add the game states
    game.state.add('Boot', Boot);
    game.state.add('Preload', Preload);
    game.state.add('Game', Game);
    //Start the game state Boot
    game.state.start('Boot');
};
