var Boot = function(){};

Boot.prototype = {
    preload: function() {
    },

    create: function(){
        //Prevents stopping the game when window loses focus
        game.stage.disableVisibilityChange = true;
        game.input.maxPointers = 1;

        game.stage.backgroundColor = '#fff';
        game.add.text(100, 100, "Loading...")

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //difference must be tested
        game.stage.scale.pageAlignHorizontally = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('Preload');
    }
}
