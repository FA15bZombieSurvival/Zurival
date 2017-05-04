//Constants
var BASE_SPEED = 180;

//Variables
var player;
var zombies;
var zombieCount = 0;
var remainingZombies = 0;

var projectiles;

var cooldown = 100;
var canShootAgain = 0;

var CreateSingleplayerGame = function () {


var game = new Phaser.Game(800, 800, Phaser.AUTO, 'gameCanvas', {preload: preload, create: create, update: update, render: render});

function preload(){
   //load game assets
   game.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('gameTiles', 'maps/tiles/terrain.png');
   game.load.image('player', 'assets/CharacterSpriteSingleLine.png');
   game.load.image('enemy', 'assets/enenmy.png');
   game.load.image('bullet', 'assets/bullet.png');
}

CreateSingleplayerGame.prototype = {
    create: function(){
        //----------    Map specific    ----------
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
        //----------    Map specific    ----------

        //----------    Player specific ----------
        //Create the character Sprite
        this.player = game.add.sprite(200, 200, 'player');
        //Create Movement animations
        this.player.animations.add('left', [3,5], 3, true);
        this.player.animations.add('right', [6,8], 3, true);
        this.player.animations.add('down', [1,2], 3, true);
        this.player.animations.add('up', [9,11], 3, true);
        //Set Camera to follow player
        this.game.camera.follow(this.player);
        //Enable collosion detection for current player
        game.physics.arcade.enable(this.player);
        //Let the world bounds be unpasseble
        this.player.body.collideWorldBounds = true
        //----------    Player specific ----------

        //Initialize empty enemy array
        enemies = [];
        enemyCount = 20;

        for (var i = 0; i < enemyCount; i++)
        {
        enemies.push(new Enemy(i, game, player));
        }

        //----------    Projectile specific ----------
        //Create projectile group
        projectiles = game.add.group();
        //Enable physics for the projectiles
        projectiles.enableBody = true;
        projectiles.physicsBodyType = Phaser.Physics.ARCADE;
        projectiles.createMultiple(30, 'rocket', 0, false);
        //Let the projectiles start from the player mid
        projectiles.setAll('anchor.x', 0);
        projectiles.setAll('anchor.y', 0);
        //Delete projectiles that leave the map bounds
        projectiles.setAll('outOfBoundsKill', true);
        projectiles.setAll('checkWorldBounds', true);
        //----------    Projectile specific ----------

        //----------    Control specific ----------
        //Bind WASD for movement
        var up = this.input.keyboard.addKey(Phaser.Keyboard.W);
        var down = this.input.keyboard.addKey(Phaser.Keyboard.S);
        var left = this.input.keyboard.addKey(Phaser.Keyboard.A);
        var right = this.input.keyboard.addKey(Phaser.Keyboard.D);

        //Bind reload key on R
        var reload = this.input.keyboard.addKey(Phaser.Keyboard.R);
        //----------    Control specific ----------
  },

  update: function(){
      remainingZombies = 0;
      for (var i = 0; i < enemies.length; i++) {
          if (enemies[i].alive) {
            remainingZombies++;
            game.physics.arcade.collide(this.player, zombies[i].tank);
            game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
            zombies[i].update();
          }
      }
      //Move left if "a" is pressed
      if(left.isDown){
        //play animation for running left
        this.facing = "left";
        //Move the player left with the basespeed
        this.body.velocity.x -= BASE_SPEED;
      }
      //Move right if "d" is pressed
      if(right.isDown){
        //play animation for running right
        this.facing = "right";
        //Move the player right with the basespeed
        this.body.velocity.x += BASE_SPEED;
      }
      //Move up if "w" is pressed
      if(up.isDown){
        //play animation for running down
        this.facing = "down";
        //Move the player up with the basespeed
        this.body.velocity.y -= BASE_SPEED;
      }
      //Move down if "s" is pressed
      if(down.isDown){
        //play animation for running up
        this.facing = "up";
        //Move the player down with the basespeed
        this.body.velocity.y += BASE_SPEED;
      }

      //Start playing animation for the direction the play is facing
      this.animations.play(this.facing);

      //Initiate collisiondetection
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
      //If player is clicking ...
      if(game.input.activePointer.isDown){
          //... let the player shoot
          shoot();
      }
  },

  shoot: function() {
      if (game.time.now > canShootAgain) {
          canShootAgain = game.time.now + cooldown;
          var newProjectile = projectiles.getFirstExists(false);
          newProjectile.reset(game.player.x, game.player.y);
          newProjectile.rotation = game.physics.arcade.moveToPointer(newProjectile, 1000, game.input.activePointer, 500);
      }
  }
}


Zombie.prototype.methodName = function () {

};

Zombie = function(index, game, player, projectiles){
    //Genereate a random position for the enemy
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 100;
    this.player = player;
    this.cooldown = 1000;
    this.nextAttack = 0;
    this.zombie = game.add.sprite(x, y, 'zombie');

    this.zombie.name = index.toString();
    game.physics.enable(this.zombie, Phaser.Physics.ARCADE);
    this.zombie.body.immovable = false;
    this.zombie.body.collideWorldBounds = true;
    this.zombie.body.bounce.setTo(1, 1);

    this.damage = function(){
        this.health -= 1;
        if (this.health <= 0){
            this.alive = false;
            this.zombie.kill();
            return true;
        }
        return false;
    }
    this.update = function(){
        //if()
        if(this.game.physics.arcade.distanceBetween(this.zombie, this.player) < 20){
            if (this.game.time.now > this.nextAttack) {
                this.nextAttack = this.game.time.now + this.cooldown;
                //hurt player
            }
        }
    }
}

}
