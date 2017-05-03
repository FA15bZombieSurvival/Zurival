var Preload = function(){};

Preload.prototype = {
    preload: function() {
        //load game assets
        this.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'maps/tiles/terrain.png');
        this.load.image('player', 'assets/CharacterSpriteSingleLine.png');
        this.load.image('enemy', 'assets/enenmy.png');
        this.load.image('bullet', 'assets/bullet.png');
        //Upon finishing loading the assets start the game
        this.load.onLoadComplete.add(function() {
          game.state.start('Game');
        });
    }
}
