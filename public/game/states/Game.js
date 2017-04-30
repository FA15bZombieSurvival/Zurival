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
        this.player = this.game.add.sprite(200, 200, 'player');
        this.game.physics.arcade.enable(this.player);

        this.game.camera.follow(this.player);

        this.player.body.collideWorldBounds = true;

        /* can replace render function
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        */

        //this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function(){

    }
}

/*
// Render Function
var render = function(){
  canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);

  if(char.moving){
    if(this.player.animateTime > 0){
      this.player.animateTime--;
    } else {
      if(this.player.animateCur + 1 < this.player.animatePos.length){
        this.player.animateCur++;
        this.player.spriteY = this.player.animatePos[this.player.animateCur];
      } else {
        this.player.animateCur = 0;
        this.player.spriteY = this.player.animatePos[0];
      }
      this.player.animateTime = 2;
    }
  }

  if(charReady){
    canvas.drawImage(charImg, this.player.spriteX, this.player.spriteY, this.player.width, this.player.height, this.player.x, this.player.y, this.player.width, this.player.height);
  }
};
*/
