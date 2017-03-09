Game = function(){};

//Variables
//Array for all pressed keys
var pressedKeys = {};

//Events for pressing and releasing keys
//Press key eventlistener
addEventListener('keydown', function (e) {
pressedKeys[e.keyCode] = true;
}, false);

//Release key eventlistener
addEventListener('keyup', function (e){
delete pressedKeys[e.keyCode];
}, false)

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
        //movementspeed
        this.baseVelocity = 128;

        //
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        //Move left if "a" is pressed
        if(65 in pressedKeys){
          //this.player.spriteX = 170;
          this.player.body.velocity.x -= this.baseVelocity;
        }
        //Move right if "d" is pressed
        if(68 in pressedKeys){
          //this.player.spriteX = 148;
          this.player.body.velocity.x += this.baseVelocity;
        }
        //Move bot if "s" is pressed
        if(83 in pressedKeys){
          //this.player.spriteX = 0;
          this.player.body.velocity.y += this.baseVelocity;
        }
        //Move up if "w" is pressed
        if(87 in pressedKeys){
          //this.player.spriteX = 74;
          this.player.body.velocity.y -= this.baseVelocity;
        }

        /*
        if(65 in keysDown && 87 in keysDown){
          this.player.spriteX = 124;
        }
        if(87 in keysDown && 68 in keysDown){
          this.player.spriteX = 100;
        }
        if(68 in keysDown && 83 in keysDown){
          this.player.spriteX = 50;
        }
        if(83 in keysDown && 65 in keysDown){
          this.player.spriteX = 26;
        }
        */

        //Change this to the server side
        /*
        OLD
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
        }*/

        this.game.physics.arcade.collide(this.player, this.blockedLayer);
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
