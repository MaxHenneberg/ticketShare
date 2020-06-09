const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passwordValidator = require('password-validator');
const crypto = require('crypto');

const User = require('../models/user/user');
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
  //Duplicated User Check
  User.findOne({username: username}, function (err, user) {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    if (user) {
      console.warn("User already exists!");
      return callback(null, false, {message: 'User already exists!'});
    }
    //PW constraints
    const list = passwordConstraints(password);
    if (list.length<=0) {
      return storeUserCredentials(username, password, callback);
    } else {
      console.warn("Password Constraint not matched!" + list);
      return callback(null, false,
          {message: 'Password Constraint not matched', failedConstraints: list});
    }
  });
};

function passwordConstraints(password) {
  var pwConstraints = new passwordValidator();

  pwConstraints
  .is().min(config.PW_MIN_LENGTH)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

  //TODO: Blacklist breached PWs

  return pwConstraints.validate(password, {list: true});
}

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

  //Adding some Pepper to the Password to improve taste
  const pepperedPW = crypto.createHmac('sha256', config.PEPPER).update(
      password).digest('hex');
  bcrypt.hash(pepperedPW, config.WORK_FACTOR,
      function (error, hash) {
        if (error) {
          return callback(error, null);
        }
        const nUser = new User({username: username, passwordHash: hash});
        console.log("Instantiates User: " + nUser);
        User.create(nUser, function (userError, createdUser) {
          if (userError) {
            console.error("Failed to save user: " + userError);
            return callback(userError, null);
          }
          console.log("Stored User to Database");
          return callback(null, createdUser);
        });
      });

}
