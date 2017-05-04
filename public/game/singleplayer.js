//Constants
var PLAYER_BASE_SPEED = 100;
var ZOMBIE_BASE_SPEED = 50;

//Variables
var map;
var player;
var zombies;
var zombieCount = 0;
var remainingZombies = 0;

var projectiles;

var cooldown = 200;
var canShootAgain = 0;
var ammo;

var up;
var down;
var left;
var right;
var reload;

var game = new Phaser.Game(800, 800, Phaser.AUTO, 'game-canvas', {preload: preload, create: create, update: update});

function preload(){
   //load game assets
   game.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('gameTiles', 'maps/tiles/terrain.png');
   game.load.spritesheet('player', 'assets/CharacterSpriteSingleLine.png', 64, 64, 12);
   game.load.spritesheet('zombie', 'assets/enemy.png', 64, 64, 12);
   game.load.image('rocket', 'assets/bullet.png');
   //Upon finishing loading the assets start the game
   this.load.onLoadComplete.add(function() {
       this.create();
   });
}

function create(){
    //----------    Map specific    ----------
    //Load the map
    map = game.add.tilemap('map1');
    //Load the textures
    map.addTilesetImage('terrain1', 'gameTiles');
    //Create background layer
    map.backgroundlayer = map.createLayer('Background');
    //Create obstacle layer
    map.blockedLayer = map.createLayer('Obstacles');
    //Set collision on the map for all obstacles
    map.setCollisionBetween(1, 2000, true, 'Obstacles');
    //Resize the map
    map.backgroundlayer.resizeWorld();
    //----------    Map specific    ----------

    //----------    Player specific ----------
    //Create the character Sprite
    player = game.add.sprite(200, 200, 'player');
    //Create Movement animations
    player.animations.add('left', [3,5], 3, true);
    player.animations.add('right', [6,8], 3, true);
    player.animations.add('down', [1,2], 3, true);
    player.animations.add('up', [9,11], 3, true);
    //Set Camera to follow player
    game.camera.follow(player);
    //Initiate collisiondetection
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.arcade.collide(player, map.blockedLayer);
    //Enable collosion detection for current player
    game.physics.arcade.enable(player);
    //Let the world bounds be unpasseble
    player.body.collideWorldBounds = true
    //Set ammo to 20 shots
    ammo = 20;
    //Set health of the player to 100
    player.health = 100;
    //----------    Player specific ----------

    //----------    Enemy specific ----------
    //Initialize empty enemy array
    zombies = [];
    zombieCount = 20;
    //Add enemies
    for (var i = 0; i < zombieCount; i++)
    {
      zombies.push(new Zombie(i, game, player));
    }
    //----------    Enemy specific ----------

    //----------    Projectile specific ----------
    //Create projectile group
    projectiles = game.add.group();
    //Enable physics for the projectiles
    projectiles.enableBody = true;
    projectiles.physicsBodyType = Phaser.Physics.ARCADE;
    projectiles.createMultiple(30, 'rocket', 0, false);
    //Let the projectiles start from the player mid
    projectiles.setAll('player.x', 1);
    projectiles.setAll('player.y', 1);
    //Delete projectiles that leave the map bounds
    projectiles.setAll('outOfBoundsKill', true);
    projectiles.setAll('checkWorldBounds', true);
    //----------    Projectile specific ----------

    //----------    Control specific ----------
    //Bind WASD for movement
    up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    right = game.input.keyboard.addKey(Phaser.Keyboard.D);

    //Bind reload key on R
    reload = game.input.keyboard.addKey(Phaser.Keyboard.R);
    //----------    Control specific ----------
}

function update(){
    //----------    Player specific ----------
    var facing;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    //Move left if "a" is pressed
    if(left.isDown){
        //play animation for running left
        facing = "left";
        //Move the player left with the basespeed
        player.body.velocity.x -= PLAYER_BASE_SPEED;
    }
    //Move right if "d" is pressed
    else if(right.isDown){
        //play animation for running right
        facing = "right";
        //Move the player right with the basespeed
        player.body.velocity.x += PLAYER_BASE_SPEED;
    }
    //Move up if "w" is pressed
    if(up.isDown){
        //play animation for running down
        facing = "up";
        //Move the player up with the basespeed
        player.body.velocity.y -= PLAYER_BASE_SPEED;
    }
    //Move down if "s" is pressed
    else if(down.isDown){
        //play animation for running up
        facing = "down";
        //Move the player down with the basespeed
        player.body.velocity.y += PLAYER_BASE_SPEED;
    }

    //Start playing animation for the direction the play is facing
    player.animations.play(facing);

    //If no movementkey is pressed ...
    if(left.isUp&&right.isUp&&up.isUp&&down.isUp){
        //... Stop Animation
        player.animations.stop();
        //If player is facing left ...
        if(player.frame == 3||player.frame == 5){
          //... set frame to stand facing left
          player.frame = 4;
          //If player is facing right ...
        }else if(player.frame == 6||player.frame == 8) {
          //... set frame to stand facing right
          player.frame = 7;
          //If player is facing front ...
        }else if(player.frame == 1||player.frame == 2){
          //... set frame to stand facing front
          player.frame = 0;
          //If player is facing back ...
        }else if(player.frame == 9||player.frame == 11){
          //... set frame to stand facing front
          player.frame = 10;
        }
    }

    //If player is clicking ...
    if(game.input.activePointer.isDown){
      //... let the player shoot
      shoot();
    }
    //If player is pressing r
    if (reload.isDown) {
        //Reload
        if (ammo == 0) {
            ammo = 20;
            canShootAgain = game.time.now + 5 * cooldown;
        }
    }
    if (player.health <= 0) {
        player.kill();
    }
    //----------    Player specific ----------

    //----------    Zombie specific ----------
    //Reset remaining Zombies counter
    remainingZombies = 0;
    //Count remaining Zombies
    for (var i = 0; i < zombies.length; i++) {
        //Only count when zombie is alive
        if (zombies[i].alive) {
            //Count one up
            remainingZombies++;
            //Check whether a zombie is colliding with a player
            game.physics.arcade.collide(player, zombies[i].zombie);
            //Check whether zombie is overlapping with a projectile
            game.physics.arcade.overlap(projectiles, zombies[i].zombie, projectileHitZombie, null, this);
            //Update zombie
            zombies[i].update(i);
        }
    }
    //If all enemies are dead generate another 20
    if (remainingZombies == 0) {
        zombies = [];
        zombieCount = 20;
        for (var i = 0; i < zombieCount; i++)
        {
            zombies.push(new Zombie(i, game, player));
        }
    }
    //----------    Zombie specific ----------
}

function shoot() {
    //Shoot if player has ammo and cooldown expired
    if (game.time.now > canShootAgain && ammo > 0) {
        //Add cooldown to next attack
        canShootAgain = game.time.now + cooldown;
        //Create new projectile
        var newProjectile = projectiles.getFirstExists(false);
        //Let it start from the middle of the player
        newProjectile.reset(player.x + 32, player.y + 32);
        //Let it move in the direction of the pointer
        newProjectile.rotation = game.physics.arcade.moveToPointer(newProjectile, 1000, game.input.activePointer);
        //Substract one ammo
        ammo--;
    }
}

Zombie = function(index, game, player, projectiles){
    this.game = game;
    //Add zombie state
    this.health = 100;
    this.alive = true;
    this.player = player;
    //Add attack cooldown
    this.cooldown = 1000;
    //Let next attack be instantly upon touching the player
    this.nextAttack = 0;
    //Genereate a random position for the enemy
    this.x = game.world.randomX;
    this.y = game.world.randomY;
    //Add a zombie
    this.zombie = game.add.sprite(this.x, this.y, 'zombie');
    //Give zombie the name of his index
    this.zombie.name = index.toString();
    //Enable phaser physics for the zombie
    game.physics.enable(this.zombie, Phaser.Physics.ARCADE);
    this.zombie.body.immovable = false;
    this.zombie.body.collideWorldBounds = true;
    this.zombie.body.bounce.setTo(10, 10);
}

Zombie.prototype.damage = function(){
    //Substract 15-25 life of the zombie
    this.health -= Math.floor(Math.random()*(25-15+1)+15);
    //If health of this zombie is 0 or lower
    if (this.health <= 0){
        //set his alive state to false and delete the sprite
        this.alive = false;
        this.zombie.kill();
    }
}

Zombie.prototype.update = function(index){
        // Get Position of the player
        var distanceX = this.zombie.x - player.x;
        var distanceY = this.zombie.y - player.y;

        this.zombie.body.velocity.x = 0
        this.zombie.body.velocity.y = 0

        if ( distanceX > 0 ){
            //Move the enemy right with the basespeed
            this.zombie.body.velocity.x -= ZOMBIE_BASE_SPEED;
        }
        else if ( distanceX < 0 ){
            //Move the enemy left with the basespeed
            this.zombie.body.velocity.x += ZOMBIE_BASE_SPEED;
        }
        if ( distanceY > 0 ){
            //Move the enemy down with the basespeed
            this.zombie.body.velocity.y -= ZOMBIE_BASE_SPEED;
        }
        else if ( distanceY < 0 ) {
            //Move the enemy up with the basespeed
            this.zombie.body.velocity.y += ZOMBIE_BASE_SPEED;
        }
        //Let enemy attack if player is in range
        if(this.game.physics.arcade.distanceBetween(this.zombie, player) < 100){
            if (this.game.time.now > this.nextAttack) {
                //Set zombie cooldown
                this.nextAttack = this.game.time.now + this.cooldown;
                //Substract 5-15 health of player
                player.health -= Math.floor(Math.random()*(15-5+1)+5);
            }
        }
    }

function projectileHitZombie(zombieIndex, newProjectile){
    newProjectile.kill();
    zombies[zombieIndex.name].damage();
}
