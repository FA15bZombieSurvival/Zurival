var mongoose = require('mongoose');

var enemySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: String,
    hp: Number,
    damage: Number,
    defence: Number,
    type: String
});

enemySchema.methods.add = function(data, callback){
    if("name" in data){
        this.save(function(err){
            if(err) return callback(err)
            else return callback(null);
        });
    }else return callback("Name is required");
}

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
    if("name" in data) enemy.name = data.name;
    if("description" in data) enemy.description = data.description;
    if("hp" in data) enemy.hp = data.hp;
    if("damage" in data) enemy.damage = data.damage;
    if("defence" in data) enemy.defence = data.defence;
    if("type" in data) enemy.type = data.type;
    enemy.save(function(err){
        if(err) return callback(err)
        else return callback(null);
    });
}

module.exports = mongoose.model("Enemy", enemySchema);
