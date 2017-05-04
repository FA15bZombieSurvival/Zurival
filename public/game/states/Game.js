var positionNextPlayer = 200;
var movementToServer = 0;
var attackToServer = 0;
var players = null;
var gameStartTime = null;

var Game = function () {};

Game.prototype = {
    initialize: function(players, userId){
        console.log(players);
        console.log(userId);
        this.players = players;
        this.playerId = userId;
    },

    create: function(){
        Game = this;
        gameStartTime = this.time.now;
        console.log(gameStartTime);
        gameStartTime = new Date().getTime();
        console.log(gameStartTime);
        //Load the map
        this.map = game.add.tilemap('map1');
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
        //this.game.camera.follow(this.player);
        socket.emit("currentMap", {tiles: blockedLayerData.data, height: blockedLayerData.data, width: blockedLayerData.width});

        //Create projectile group
        this.projectiles = game.add.group();
        this.projectiles.createMultiple(30, 'rocket', 0, false);
        this.projectiles.setAll('anchor.x', 0.5);
        this.projectiles.setAll('anchor.y', 0.5);
        this.projectiles.setAll('outOfBoundsKill', true);
        this.projectiles.setAll('checkWorldBounds', true);
        game.physics.enable(this.projectiles, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.blocklayer);

        this.setEventHandlers();
        this.createCharacters();

        //TODO: Everything player specific has to be outsource in an extra file
        //this.player = this.game.add.sprite(200, 200, 'player');
        //this.game.physics.arcade.enable(this.player);

        //this.player.body.collideWorldBounds = true

    },

    setEventHandlers: function() {
        //socket is the previously set one
        socket.on("move", this.onMovement.bind(this));
        socket.on("death", this.onPlayerDeath.bind(this));
        socket.on("gameEnd", this.onGameEnd.bind(this));
        socket.on("attack", this.onAttack.bind(this));
        socket.on("disconnect", this.onDisconnect);
    },

    onDisconnect: function() {
      this.broadcast.emit("removePlayer", {id: this.id})
    },

    onMovement: function() {

    },

    onPlayerDeath: function() {

    },

    onGameEnd: function() {

    },

    onAttack: function() {

    },

    update: function() {
        player.handleInput();
    },

    createCharacters: function() {
        //Create all characters for every person that joined the lobby
        for(var i in this.players) {
            //Save current player for iteration into a variable
            var iterationPlayer = this.players[i];
            if(iterationPlayer.id == this.playerId) {
                //Create character for the client player
                player = new Player(positionNextPlayer, positionNextPlayer, iterationPlayer.id);
            } else {
                //Create character for external player
                this.remotePlayers[iterationPlayer.id] = new ExternalPlayer(positionNextPlayer, positionNextPlayery, iterationPlayer.id);
            }
            positionNextPlayer = positionNextPlayer + 200;
        }
    }
<<<<<<< HEAD
}
=======
}*/
>>>>>>> Multiplayer
