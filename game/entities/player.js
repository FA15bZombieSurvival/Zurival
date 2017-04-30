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
