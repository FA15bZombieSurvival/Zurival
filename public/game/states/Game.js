Game = function(){};

Game.prototype = {
    create: function(){
        this.map = this.game.add.tilemap('map1');

        this.map.addTilesetImage('terrain1', 'gameTiles');

        this.backgroundlayer = this.map.createLayer('Background');
        this.blockedLayer = this.map.createLayer('Obstacles');

        this.map.setCollisionBetween(1, 2000, true, 'Obstacles');

        this.backgroundlayer.resizeWorld();

        //TODO: Everything player specific has to be outsource in an extra file
        this.player = this.game.add.sprite(100, 100, 'player');
        this.game.physics.arcade.enable(this.player);

        this.game.camera.follow(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function(){

        //Change this to the server side
        this.baseVelocity = 64;

        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        //Up
        if(this.cursors.up.isDown){
            this.player.body.velocity.y -= this.baseVelocity;
        }
        //Down
        if(this.cursors.down.isDown){
            this.player.body.velocity.y += this.baseVelocity;
        }
        //Left
        if(this.cursors.left.isDown){
            this.player.body.velocity.x -= this.baseVelocity;
        }
        //Right
        if(this.cursors.right.isDown){
            this.player.body.velocity.x += this.baseVelocity;
        }

        this.game.physics.arcade.collide(this.player, this.blockedLayer);
    }
}
