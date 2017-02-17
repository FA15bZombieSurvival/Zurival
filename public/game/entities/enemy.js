module.exports = function Enemy(data){
    this.sprite = data.sprite;
    this.x = data.x;
    this.y = data.y;
    this.name = data.name;
    this.currHp = this.hp = data.hp;

    this.update = function(delta, hp){
        this.x += 10 * delta;
        this.y += 10 * delta;
        if(hp) this.currHp = hp;
    }
}
