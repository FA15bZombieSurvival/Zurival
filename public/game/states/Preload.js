Preload = function(){};

Preload.prototype = {
    preload: function() {

        //load game assets
        this.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'maps/tiles/terrain.png');
        this.load.image('player', 'assets/player.png');

    },
    create: function() {
        this.state.start('Game');
    }
}
