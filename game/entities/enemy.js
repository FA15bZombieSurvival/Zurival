var minDistance;

module.exports = function Enemy(x, y, data){
    this.sprite = data.sprite;
    this.x = x;
    this.y = y;
    this.damage = data.damage;
    this.armor = data.armor;
    this.type = data.type;
    this.alive = true;
    //Movementspeed
    this.baseVelocity = 96;

    this.update = function(delta){
         minDistance = 0;
        // Get Positions of the players
        for (var i = 0; i < players.length; i++) {
            var playerX = players[i].x;
            var playerY = players[i].y;
            var distanceX = this.x - playerX;
            var distanceY = this.y - playerY;
            var distance = math.sqrt(pow(distanceX, 2) + pow(distanceY, 2))
            if ( distance < minDistance ){
              minDistance = distance;
              minDistanceX = distanceX;
              minDistanceY = distanceY;
            }
            else if ( minDistance = 0 )
            {
              minDistance = distance;
            }
        }
        if ( minDistanceX > 0 ){
          //Move the enemy right with the basespeed
          this.body.velocity.x += this.baseVelocity;
        }
        else if ( minDistanceX < 0 ){
          //Move the enemy left with the basespeed
          this.body.velocity.x += this.baseVelocity;
        }
        if ( minDistanceY > 0 ){
          //Move the enemy down with the basespeed
          this.body.velocity.y += this.baseVelocity;
        }
        else if ( minDistanceY < 0 ) {
          //Move the enemy up with the basespeed
          this.body.velocity.y += this.baseVelocity;
        }
        //hier fehlt noch die id des gegners
        //d.h. welcher gegner gerade bewegt wurde
        client.emit('positionEnemies', { xPosition: this.x, yPosition: this.y } );
    }

    this.damageStep = function(damage){
        if(damage >= 0){
            diff = this.armor - damage;
            this.currHp -= diff >= 0 ? diff : 0;
            if(this.currHp < 0){
                this.currHp = 0;
                this.alive = false;
                return false;
            }
            return true;
        }
        return true;
    }
}
