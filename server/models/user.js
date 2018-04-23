const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  tokens: [{
    token: {
      type: String
    }
  }]
});



UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET).toString();
  user.tokens.push({ token });
  return user.save().then(() => {
    return { token }
  })
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject("沒有這個會員");
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password).then((res) => {
        if (res) {
          resolve(user);
        } else {
          reject("此密碼錯誤");
        }
      })
    })
  })
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': decoded.access
  })
}


UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      next();
    })
  } else {
    next();
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;