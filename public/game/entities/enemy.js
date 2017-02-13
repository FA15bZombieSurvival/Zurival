module.exports = function Enemy(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function(delta){
        this.x += 10 * delta;
        this.y += 10 * delta;
    }
}
