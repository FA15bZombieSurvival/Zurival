var movementToServer = 0;
var attackToServer = 0;

var Game = function () {};
var player = new Player(/* x, y, id, color */);

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
      player.handleInput();
    }
}
