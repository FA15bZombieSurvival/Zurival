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
    yVelocity
    moveToServer;

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
            attackToServer = 01;
        }

        sockets.send('message', moveToServer);
}

Player.prototype.generate = function(){

}
