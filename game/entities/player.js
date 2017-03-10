// Private

// From schema character.js
var id,
    name,
    userID,
    inventarID,
    gender,
    skincolor,
    hair,
    haircolor,
    gear,
    costume,
    hp,
    weapon,
    deaths,
    kills,
    rounds,
    created;

// Ingame specific
var x,
    y,
    width,
    height,
    xVelocity,
    yVelocity;

//private functions are written like this
function dummy(dummyValue1) {
  return dummyValue1 - 0.1;
}

// Public
module.exports = Player;

// Constructor
function Player(data) {
    this.id = data._id;
    this.name = data.name;
    this.userID = data.userID;
    this.inventarID = data.inventarID;
    this.gender = data.gender;
    this.skincolor = data.skincolor;
    this.hair = data.hair;
    this.haircolor = data.haircolor;
    this.gear = data.gear;
    this.costume = data.costume;
    this.hp = data.hp;
    this.weapon = data.weapon;
    this.deaths = data.deaths;
    this.kills = data.kills;
    this.rounds = data.rounds;
    this.created = data.created;

    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.xVelocity = data.xVelocity;
    this.yVelocity = data.yVelocity;
}

/*
Player.prototype.update = function(keyPressed, delta){
    //Reset the move and attack variable before sending it again
    moveToServer = 0;
    attackToServer = 0;

    //Move left if "a" is pressed
    if(left.isDown){
      //play animation for running left
      this.player.animations.play('left');
      //Set the first Bit of the move variable
      moveToServer |= (1<<0);
    }


//Move right if "d" is pressed
update: function(){
  //Movementspeed
  this.baseVelocity = 128;

  //Move left
  if (moveDirection == 01){
    //Move the player left with the basespeed
    this.player.body.velocity.x -= this.baseVelocity;
  }
  //Move right
  if (moveDirection == 010){
    //Move the player right with the basespeed
    this.player.body.velocity.x += this.baseVelocity;
  }
  //Move up
  if (moveDirection == 0100){
    //Move the player up with the basespeed
    this.player.body.velocity.y -= this.baseVelocity;
  }
  //Move down
  if (moveDirection == 01000){
    //Move the player down with the basespeed
    this.player.body.velocity.y += this.baseVelocity;
  }
  if (moveDirection == 0101){
    //Move the player left with the basespeed
    this.player.body.velocity.x -= this.baseVelocity;
    //Move the player up with the basespeed
    this.player.body.velocity.y -= this.baseVelocity;
  }
  if (moveDirection == 0110){
    //Move the player right with the basespeed
    this.player.body.velocity.x += this.baseVelocity;
    //Move the player up with the basespeed
    this.player.body.velocity.y -= this.baseVelocity;
  }
  if (moveDirection == 01001){
    //Move the player left with the basespeed
    this.player.body.velocity.x -= this.baseVelocity;
    //Move the player down with the basespeed
    this.player.body.velocity.y += this.baseVelocity;
  }
  if (moveDirection == 01010){
    //Move the player right with the basespeed
    this.player.body.velocity.x += this.baseVelocity;
    //Move the player down with the basespeed
    this.player.body.velocity.y += this.baseVelocity;
  }
}

Player.prototype.generate = function(){

}
*/
