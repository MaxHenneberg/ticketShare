const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user/user');
const bcrypt = require('bcrypt');
const config = require("../../config/keys");

passport.use(new LocalStrategy(
    function (username, password, done) {
      User.findByUsername(username, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Incorrect username.'});
        }
        if (!validPassword(user, password)) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
      });
    }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/**
 * Function to handle Registration
 * Covers: Password Constraints
 * Covers: Duplicated User check
 * @param username Chosen username by User
 * @param password Chosen password by User
 * @param callback function(error, StoredUser, AdditonalInfo)
 */
exports.handleRegister = function (username, password, callback) {
  //TODO: password Constraints
  //TODO: Move dupliate User check to here

  return storeUserCredentials(username, password, callback);
};

/**
 * Validates password to given User
 * @param user User to which the given password should match
 * @param password Password given by User
 */
function validPassword(user, password) {
  bcrypt.compare(password, user.passwordHash, function (err, result) {
    if (err) {
      console.error(err);
    }
    return result;
  })
}

/**
 * Stores given Credential to Databases (Hashes Password in process)
 * @param username Chosen username by User
 * @param password Chosen password by User
 * @param callback callback function(error, StoredUser, AdditonalInfo)
 */
function storeUserCredentials(username, password, callback) {
  User.findOne({username: username}, function (err, user) {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    if (user) {
      console.warn("User already exists!");
      return callback(null, false, {message: 'User already exists!'});
    }
    bcrypt.hash(password, config.WORK_FACTOR, function (error, hash) {
      if (error) {
        return callback(error, null);
      }
      const nUser = new User({username: username, passwordHash: hash});
      User.create(nUser, function (userError, createdUser) {
        if(userError) return callback(userError, null);
        return callback(null, createdUser);
      });
      return callback(null, nUser);
    });
  });
}
