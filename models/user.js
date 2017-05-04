var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    gold: Number,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// If a user should be saved to the database, a hash value of the password will be generated.
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Compares the given password with the hash value in the database.
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Generates the Jason-Web-Token from the user information.
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); //TODO: get from Environment Variable (process.env.ENV_VARIABLE)
};

// Updates the user.
userSchema.methods.update = function(name, data, callback) {
    getUser(name, function(err, user){
        updateUser(user, data, function(err){
            if(err) callback(err)
            else callback(null);
        })
    });
};

// Helper function to update the fields in the user database.
function updateUser(user, data, callback){
    if("gold" in data) user.gold = data.gold;
    user.save(function(err){
        if(err) return callback("Err:CantUpdateUser");
        else return callback(null);
    });
}

// Seaches and returns a specific user either by email, name or id from the database.
function getUser(name, callback){
    this.findOne({email: name}, function(err, user){
        if(err) return callback(err);
        if(user){
            callback(null, user);
        }else{
            this.findOne({name: name}, function(err, user){
                if(err) return callback(err);
                if(user){
                    callback(null, user);
                }else{
                    this.findById(name, function(err, user){
                        if(err) return callback(err);
                        if(user){
                            callback(null, user);
                        }else return callback("Err:UserNotFound");
                    });
                }
            });
        }
    });
}

<<<<<<< HEAD
userSchema.getAllUsers = function(callback){
    this.find({}, {username:1}, function(err, data) {
        if(err) return callback(err);
        if(data) {
            callback(null, data);
        }
    });
}

// Changes the password.
userSchema.methods.changePassword = function(name, password, callback){
    getUser(name, function(err, user){
        if(err) return callback(err);
        if(user){
            user.password = password;
            user.save(function(err){
                if(err) return callback("Err:CantChangePassword")
                else return callback(null);
            });
        }
    });
}

// Changes the email, if its not already been taken.
userSchema.methods.changeEmail = function(name, email, callback){
    getUser(name, function(err, user){
        if(err) return callback(err);
        if(user){
            getUser(email, function(err, other){
                if(err){
                    if(err.indexOf("Err:UserNotFound")){
                        user.email = email;
                        user.save(function(err){
                            if(err) return callback("Err:CantChangeEmail")
                            else return callback(null);
                        });
                    }else return callback(err);
                }
                if(other) return callback("Err:EmailAlreadyTaken");
            });
        }
    });
}

// Changes the name, if its not already been taken.
userSchema.methods.changeName = function(name, otherName, callback){
    getUser(name, function(err, user){
        if(err) return callback(err);
        if(user){
            getUser(otherName, function(err, other){
                if(err){
                    if(err.indexOf("Err:UserNotFound")){
                        user.name = otherName;
                        user.save(function(err){
                            if(err) return callback("Err:CantChangeName")
                            else return callback(null);
                        });
                    }else return callback(err);
                }
                if(other) return callback("Err:NameAlreadyTaken");
            });
        }
    });
}

// Adds a friend.
userSchema.methods.addFriend = function(name, _id, callback){
    getUser(name, function(err, user){
        if(err) return callback(err);
        if(user){
            getUser(_id, function(err, friend){
                if(err) return callback("Err:CantFindFriend");
                if(friend){
                    user.friends.push(_id);
                    user.save(function(err){
                        if(err) return callback("Err:CantAddFriend")
                        else return callback(null);
                    });
                }
            });
        }
    });
}

// Removes a friend.
userSchema.methods.deleteFriend = function(name, _id, callback){
    getUser(name, function(err, user){
        if(err) return callback(err);
        if(user){
            var index = user.friends.indexOf(_id);
            if(index !== -1){
                user.friends.splice(index, 1);
                user.save(function(err){
                    if(err) return callback("Err:CantDeleteFriend")
                    else return callback(null);
                });
            }else return callback("Err:FriendNotFound");
        }
    });
}

module.exports = mongoose.model("User", userSchema);
