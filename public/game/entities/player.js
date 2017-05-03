//Variables
var BASE_SPEED = 180;

var Player = function(x, y, id, game) {
  this.spawnPoint = {x: x, y: y};
  this.id = id;
  this.facing = "down";
  this.speed = BASE_SPEED;

  //Add Sprite
  this.player = game.add.sprite(200, 200, 'player');

  //Create Movement animations
  this.player.animations.add('left', [3,5], 3, true);
  this.player.animations.add('right', [6,8], 3, true);
  this.player.animations.add('down', [1,2], 3, true);
  this.player.animations.add('up', [9,11], 3, true);

  //--------------------------------------------------
  //Bind WASD for movement
  var up = this.player.input.keyboard.addKey(Phaser.Keyboard.W);
  var down = this.player.input.keyboard.addKey(Phaser.Keyboard.S);
  var left = this.player.input.keyboard.addKey(Phaser.Keyboard.A);
  var right = this.player.input.keyboard.addKey(Phaser.Keyboard.D);

  //Bind inventory key on I
  var inventory = this.player.input.keyboard.addKey(Phaser.Keyboard.I);

  //Bind actionbar keys
  var actionbar1 = this.player.input.keyboard.addKey(Phaser.Keyboard.ONE);
  var actionbar2 = this.player.input.keyboard.addKey(Phaser.Keyboard.TWO);
  var actionbar3 = this.player.input.keyboard.addKey(Phaser.Keyboard.THREE);
  var actionbar4 = this.player.input.keyboard.addKey(Phaser.Keyboard.FOUR);
  var actionbar5 = this.player.input.keyboard.addKey(Phaser.Keyboard.FIFE);

  //Bind reload key on R
  var reload = this.player.input.keyboard.addKey(Phaser.Keyboard.R);
  //--------------------------------------------------

  game.add.existing(this);
};

Player.handleInput = function() {
  this.handleMovementInput();
  this.handleAttackInput();
  this.handleHotbarInput();
  this.handleReloadInput();
  this.playerInventoryInput();
};

Player.handleMovementInput = function() {
  //Move left if "a" is pressed
  if(left.isDown){
    //play animation for running left
    this.facing = "left";
    //Move the player left with the basespeed
    this.body.velocity.x -= this.speed;
  }
  //Move right if "d" is pressed
  if(right.isDown){
    //play animation for running right
    this.facing = "right";
    //Move the player right with the basespeed
    this.body.velocity.x += this.speed;
  }
  //Move up if "w" is pressed
  if(up.isDown){
    //play animation for running down
    this.facing = "down";
    //Move the player up with the basespeed
    this.body.velocity.y -= this.speed;
  }
  //Move down if "s" is pressed
  if(down.isDown){
    //play animation for running up
    this.facing = "up";
    //Move the player down with the basespeed
    this.body.velocity.y += this.speed;
  }

  //Start playing animation for the direction the play is facing
  this.animations.play(this.facing);
  //removed .player
  //this.player.animations.play(this.facing);

  //Initiate collisiondetection
  //maybe must be in game.js ?
  game.physics.arcade.collide(this, level.blockLayer);
  //Different Version - copied this.blockedlayer
  //game.physics.arcade.collide(this, this.blockedLayer);
  //Old Version
  //this.game.physics.arcade.collide(this, this.blockedLayer);

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

  //Send movement status to the server
  socket.emit('playerMovement', {x: this.position.x, y: this.position.y, facing: this.facing});
};

Player.handleAttackInput = function() {
  //Reset the attack variable before sending it again
  attackToServer = false;

  //Set attack variable true if left mouseclick
  if (game.input.activePointer.isDown)
  {
      attackToServer = true;
  }

  //Send attack and movementStatus to the server
  socket.emit('playerAttack', {attack: attackToServer});
};

Player.handleHotbarInput = function() {
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

  socket.emit('playerHotbarInput', {hotkey: pressedHotkey});
};

Player.handleReloadInput = function() {
  if (reload.isDown){

  }
  socket.emit('playerReloadInput', {reload: pressedreload});
};

Player.handleInventoryInput = function(){
    if (inventory.isDown){

    }
    socket.emit('playerInventoryInput', {inventory: openInventory});
};

Player.reset = function() {
    this.x = this.spawnPoint.x;
    this.y = this.spawnPoint.y;
    //this.frame = this.firstFrame;
    //this.facing = "down";

    if(!this.alive) {
      this.revive();
    }
};

//angular.module.exports = Player;
*/
