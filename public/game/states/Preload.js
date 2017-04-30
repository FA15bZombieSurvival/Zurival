var Preload = function(){};

Preload.prototype = {
    preload: function() {

        //load game assets
        this.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'maps/tiles/terrain.png');
        this.load.image('player', 'assets/player.png');
        //this.load.image('enemy'm 'assets/enemy.png');

        game.state.start('Game');
    },
    /* muss glaube ich oben rein funktioniert sonst nicht?
    create: function() {
        this.state.start('Game');
    }*/
}

//module.exports = Preload
