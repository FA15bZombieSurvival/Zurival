var mongoose = require('mongoose');

var enemySchema = new mongoose.Schema({
    sprite: Number,
    name: { type: String, unique: true, required: true },
    description: String,
    hp: Number,
    damage: Number,
    armor: Number,
    type: String
});

enemySchema.methods.update = function(name, data, callback){
    this.findOne({ name: name }, function(err, enemy){
        if(err) return callback(err);
        if(!enemy){
            this.findById(name, function(err, enemy){
                if(err) return callback(err);
                if(enemy){
                    updateEnemy(enemy, err);
                    if(err) return callback(err);
                    else return callback(null);
                }
            });
        }else{
            updateEnemy(enemy, err);
            if(err) return callback(err);
            else return callback(null);
        }
    }
}

enemySchema.methods.delete = function(name, callback){
    this.findOne({name: name}, function(err, enemy){
        if(err) return callback(err);
        if(!enemy){
            this.findById(name, function(err, enemy){
                if(err) return callback(err);
                if(enemy)
                    enemy.remove(function(err){
                        return callback(err);
                    });
                else
                    return callback("Could not be removed");
            });
        }else{
            if(enemy)
                enemy.remove(function(err){
                    return callback(err);
                });
            else
                return callback("Could not be removed");
        }
    });
}

function updateEnemy(enemy, callback){
    if("sprite" in data) enemy.sprite = data.sprite;
    if("name" in data) enemy.name = data.name;
    if("description" in data) enemy.description = data.description;
    if("hp" in data) enemy.hp = data.hp;
    if("damage" in data) enemy.damage = data.damage;
    if("armor" in data) enemy.armor = data.armor;
    if("type" in data) enemy.type = data.type;
    enemy.save(function(err){
        if(err) return callback(err)
        else return callback(null);
    });
}

module.exports = mongoose.model("Enemy", enemySchema);
