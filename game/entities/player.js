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

// Socket from client
var socket;

// Ingame specific
var x,
    y,
    width,
    height,
    xVelocity,
    yVelocity;

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

    this.socket = data.socket;

    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.xVelocity = data.xVelocity;
    this.yVelocity = data.yVelocity;
}

Player.prototype = {
  /*
  function fire () {
      if (game.time.now > nextFire && bullets.countDead() > 0)
      {
          nextFire = game.time.now + fireRate;

          var bullet = bullets.getFirstExists(false);

          bullet.reset(turret.x, turret.y);

          bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
      }
  }
  */
}

module.exports = Player;
