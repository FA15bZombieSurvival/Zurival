var Game = function () {};
var enemies;
var projectiles;
var enemyCount;
var remainingZombies;

Game.prototype = {
  create: function(){
    //Load the map
    this.map = this.game.add.tilemap('map1');
    //Load the textures
    this.map.addTilesetImage('terrain1', 'gameTiles');
    //Create background layer
    this.backgroundlayer = this.map.createLayer('Background');
    //Create obstacle layer
    this.blockedLayer = this.map.createLayer('Obstacles');
    //Set collision on the map for all obstacles
    this.map.setCollisionBetween(1, 2000, true, 'Obstacles');
    //Resize the map
    this.backgroundlayer.resizeWorld();
    //Set Camera to follow player
    this.game.camera.follow(this.player);
    //Create the character Sprite
    this.player = game.add.sprite(200, 200, 'player'); //must be new player()
    //Create Movement animations
    this.player.animations.add('left', [3,5], 3, true);
    this.player.animations.add('right', [6,8], 3, true);
    this.player.animations.add('down', [1,2], 3, true);
    this.player.animations.add('up', [9,11], 3, true);

    //Let the world bounds be unpasseble
    this.player.body.collideWorldBounds = true
    //Enable collosion detection for current player
    game.physics.arcade.enable(this.player);

    //Initialize empty enemy array
    enemies = [];
    enemyCount = 20;

    for (var i = 0; i < enemyCount; i++)
    {
        enemies.push(new Enemy(i, game, player));
    }

    //Create projectile group
    projectiles = game.add.group();
    projectiles.enableBody = true;
    projectiles.physicsBodyType = Phaser.Physics.ARCADE;
    projectiles.createMultiple(30, 'rocket', 0, false);
    projectiles.setAll('anchor.x', 0.5);
    projectiles.setAll('anchor.y', 0.5);
    projectiles.setAll('outOfBoundsKill', true);
    projectiles.setAll('checkWorldBounds', true);
  }

  update: function(){
    remainingZombies = 0;
    for (var i = 0; i < enemies.length; i++)
      {
        if (enemies[i].alive)
        {
          enemiesAlive++;
          game.physics.arcade.collide(tank, enemies[i].tank);
          game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
          enemies[i].update();
        }
      }

  }
}



/*
var movementToServer = 0;
var attackToServer = 0;

var Game = function () {};

Game.prototype = {
    initialize: function(){

    },

    create: function(){
      //load the map
      this.map = this.game.add.tilemap('map1');
      //Load the textures
      this.map.addTilesetImage('terrain1', 'gameTiles');
      //Set Camera to follow player
      this.game.camera.follow(this.player);

      this.backgroundlayer = this.map.createLayer('Background');
      this.blockedLayer = this.map.createLayer('Obstacles');

      this.map.setCollisionBetween(1, 2000, true, 'Obstacles');

      this.backgroundlayer.resizeWorld();

      //TODO: Everything player specific has to be outsource in an extra file
      this.player = this.game.add.sprite(200, 200, 'player');
      this.game.physics.arcade.enable(this.player);



      this.player.body.collideWorldBounds = true

      this.setEventHandlers();
    },

    setEventHandlers: function() {
      //socket is the previously set one
      socket.on("disconnect", this.onDisconnect);
      socket.on("move", this.onMovement.bind(this));
      socket.on("death", this.onPlayerDeath.bind(this));
      socket.on("gameEnd", this.onGameEnd.bind(this));
      socket.on("attack", this.onAttack.bind(this));
      socket.on("collectLoot", this.collectLoot.bind(this));
    },

    onDisconnect: function() {
      //this.broadcast.emit("removePlayer", {id: this.id})
    },

    onMovement: function() {

    },

    onPlayerDeath: function() {

    },

    onGameEnd: function() {

    },

    onAttack: function() {

    },

    collectLoot: function() {

    },

    update: function() {
      var test = new Player(200, 200, 1, this);
      test.handleInput();
    }
}
*/
