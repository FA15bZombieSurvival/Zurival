module.exports = function Enemy(x, y, data){
    this.sprite = data.sprite;
    this.x = x;
    this.y = y;
    this.damage = data.damage;
    this.armor = data.armor;
    this.type = data.type;
    this.alive = true;

    // Updates the point where the enemy stands.
    this.update = function(delta){
        this.x += 10 * delta;
        this.y += 10 * delta;
    }

    // Updates the HP if the enemy was hit.
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
