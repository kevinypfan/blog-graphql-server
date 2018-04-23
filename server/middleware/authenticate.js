const User = require('../models/user');


const authenticate = (req, res, next) => {
  var token = req.header('authToken');
  User.findByToken(token).then(user => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch(() => {
    req.user = null;
    next();
  })
}

module.exports = { authenticate };