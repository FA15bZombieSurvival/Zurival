var mongoose = require('mongoose');
var Enemy = require('./enemy.js');

var mapSchema = new mongoose.Schema({
    name: String,
    maxPlayers: Number,
    survivingTime: Number,
    enemyTypes: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Enemy'
    }]
});

module.exports = mongoose.model("Map", mapSchema);
