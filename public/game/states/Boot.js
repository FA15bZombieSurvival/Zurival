Boot = function(){};

Boot.prototype = {
    preload: function() {
    },

    create: function(){

        this.game.stage.backgroundColor = '#fff';
        this.game.add.text(100, 100, "Loading...")

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
}
