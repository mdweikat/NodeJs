const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const secretHashKey = 'murad';

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not valid email.'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    },
    createdAt: {
      type: Date,
      require: true
    }
  }]
}, { usePushEach: true });


UserSchema.methods.toJSON = function() {
  var user = this;
  var userObj = user.toObject();

  return _.pick(userObj, ['_id', 'email']);

};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, secretHashKey).toString();

  user.tokens.push({access, token});

  return user.save().then( () => {
    return token;
  });

};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, secretHashKey);
  } catch (err) {
    console.log(err);

    return Promise.reject({
      "name": "decodeTokenError",
      "message": "Invalid Token."
    });
  }

  return User.findOne({
    '_id' : decoded._id,
    'tokens.token' : token,
    'tokens.access' : decoded.access
  });

};

var User = mongoose.model('User', UserSchema);

module.exports = {User}
