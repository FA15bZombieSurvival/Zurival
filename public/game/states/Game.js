Game = function(){};

//Variables

Game.prototype = {
    create: function(){
      this.map = this.game.add.tilemap('map1');

      this.map.addTilesetImage('terrain1', 'gameTiles');

      this.backgroundlayer = this.map.createLayer('Background');
      this.blockedLayer = this.map.createLayer('Obstacles');

      this.map.setCollisionBetween(1, 2000, true, 'Obstacles');

      this.backgroundlayer.resizeWorld();

      //Bind WASD for movement
      up = this.input.keyboard.addKey(Phaser.Keyboard.W);
      down = this.input.keyboard.addKey(Phaser.Keyboard.S);
      left = this.input.keyboard.addKey(Phaser.Keyboard.A);
      right = this.input.keyboard.addKey(Phaser.Keyboard.D);

      //Bind inventory key on I
      inventory = this.input.keyboard.addKey(Phaser.Keyboard.I);

      //Bind actionbar keys
      actionbar1 = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
      actionbar2 = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
      actionbar3 = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
      actionbar4 = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
      actionbar5 = this.input.keyboard.addKey(Phaser.Keyboard.FIFE);

      //Bind reload keyboard
      reload = this.input.keyboard.addKey(Phaser.Keyboard.R);

      //Enable collosion detection for current player
      this.game.physics.arcade.enable(this.player);

      //MAYBE NOT
      //TODO: Everything player specific has to be outsource in an extra file
      this.player = this.game.add.sprite(200, 200, 'player');

      //Let the Player be the center of the camera
      this.game.camera.follow(this.player);

      //Let the world bounds be collision
      this.player.body.collideWorldBounds = true;
    },

    update: function(){
        //Reset the move and attack variable before sending it again
        moveToServer = 0;
        attackToServer = false;

        //Move left if "a" is pressed
        if(left.isDown){
          //play animation for running left
          this.player.animations.play('left');
          //Set the first Bit of the move variable
          moveToServer |= (1<<0);
        }
        //Move right if "d" is pressed
        if(right.isDown){
          //play animation for running right
          this.player.animations.play('right');
          //Set the second Bit of the move variable
          moveToServer |= (1<<1);
        }
        //Move up if "w" is pressed
        if(up.isDown){
          //play animation for running down
          this.player.animations.play('back');
          //Set the third Bit of the move variable
          moveToServer |= (1<<2);
        }
        //Move down if "s" is pressed
        if(down.isDown){
          //play animation for running up
          this.player.animations.play('front');
          //Set the fourth Bit of the move variable
          moveToServer |= (1<<3);
        }

        //Initiate collisiondetection
        this.game.physics.arcade.collide(this.player, this.blockedLayer);

        //If no movementkey is pressed ...
        if(left.isUp&&right.isUp&&up.isUp&&down.isUp){
          //... Stop Animation
          this.player.animations.stop();
          //If player is facing left ...
          if(this.player.frame == 3||this.player.frame == 5){
            //... set frame to stand facing left
            this.player.frame = 4;
            //If player is facing right ...
          }else if(this.player.frame == 6||this.player.frame == 8) {
            //... set frame to stand facing right
            this.player.frame = 7;
            //If player is facing front ...
          }else if(this.player.frame == 1||this.player.frame == 2){
            //... set frame to stand facing front
            this.player.frame = 0;
            //If player is facing back ...
          }else if(this.player.frame == 9||this.player.frame == 11){
            //... set frame to stand facing front
            this.player.frame = 10;
          }
        }

        if (game.input.activePointer.isDown)
        {
            attackToServer = true;
        }

        if (reload.isDown){

        }

        if (inventory.isDown){

        }

        if (actionbar1.isDown){

        }

        if (actionbar2.isDown){

        }

        if (actionbar3.isDown){

        }

        if (actionbar4.isDown){

        }

        if (actionbar5.isDown){

        }

        //Send attack and movementStatus to the server
        socket.emit('playerAction', {moveDirection: moveToServer, attack: attackToServer});
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
