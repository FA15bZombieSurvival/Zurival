var mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
    _id: Number,
    id: { type: String, unique: true, required: true },
    name: String,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    inventarID: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventar' },
    gender: String,
    skincolor: String,
    hair: Number,
    haircolor: String,
    gear: {
        head: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        body: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        legs: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
    },
    costume: {
        head: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        body: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        legs: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
    },
    hp: Number,
    weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    deaths: Number,
    kills: Number,
    rounds: Number,
    created: { type: Date, default: Date.now }
});

characterSchema.methods.update = function(id, data, callback){
    this.findOne({ id: id }, function(err, character){
        if(err) return callback(err);
        if(character){
            updateCharacter(character, data, err);
            if(err) return callback(err);
            else return callback(null);
        }else{
            this.findById(id, function(err, character){
                if(err) return callback(err);
                if(character){
                    updateCharacter(character, data, err);
                    if(err) return callback(err);
                    else return callback(null);
                }
            });
        }
    }
}

characterSchema.methods.delete = function(name, callback){
    this.findOne({name: name}, function(err, character){
        if(err) return callback(err);
        if(!character){
            this.findById(name, function(err, character){
                if(err) return callback(err);
                if(character)
                    character.remove(function(err){
                        return callback(err);
                    });
                else
                    return callback("Could not be removed");
            });
        }else{
            if(character)
                character.remove(function(err){
                    return callback(err);
                });
            else
                return callback("Could not be removed");
        }
    });
}

function updateCharacter(character, data, callback){
    if("id" in data) character.id = data.id;
    if("name" in data) character.name = data.name;
    if("userID" in data) character.userID = data.userID;
    if("inventarID" in data) character.inventarID = data.inventarID;
    if("gender" in data) character.gender = data.gender;
    if("skincolor" in data) character.skincolor = data.skincolor;
    if("hair" in data) character.hair = data.hair;
    if("haircolor" in data) character.haircolor = data.haircolor;
    if("hp" in data) character.hp = data.hp;
    if("weapon" in data) character.weapon = data.weapon;
    if("deaths" in data) character.deaths = data.deaths;
    if("kills" in data) character.kills = data.kills;
    if("rounds" in data) character.rounds = data.rounds;
    if("gear" in data){
        if("head" in data.gear) character.gear.head = data.gear.head;
        if("body" in data.gear) character.gear.body = data.gear.body;
        if("legs" in data.gear) character.gear.legs = data.gear.legs;
    }
    if("costume" in data){
        if("head" in data.costume) character.costume.head = data.costume.head;
        if("body" in data.costume) character.costume.body = data.costume.body;
        if("legs" in data.costume) character.costume.legs = data.costume.legs;
    }
    character.save(function(err){
        if(err) return callback(err)
        else return callback(null);
    });
}

module.exports = mongoose.model("Character", characterSchema);
