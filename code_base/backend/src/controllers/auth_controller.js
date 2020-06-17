const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passwordValidator = require('password-validator');
const crypto = require('crypto');

const User = require('../models/user/user');
const config = require("../../config/keys");

/**
 * Defining the `local` Strategy to use to auth a user login.
 */
passport.use(new LocalStrategy(
    function (username, password, done) {
      console.log("Tryed Login with: %s / %s", username, password);
      User.findOne({username: username}, function (err, user) {
        if (err) {
          console.error(err);
          return done(err);
        }
        if (!user) {
          console.warn("No User Found for: %s", username);
          return done(null, false, {message: 'Incorrect username.'});
        }
        validPassword(user, pepperPassword(password), done);
      });
    }
));

/**
 * Standard Passport serialization of User into Session
 */
passport.serializeUser(function (user, done) {
  console.log("Serialize User: %s",user.username);
  done(null, user.id);
});

/**
 * Standard Passport deserialization of User from Session
 */
passport.deserializeUser(function (id, done) {
  console.log("Try to deserializeUser: " + id);
  User.findById(id, function (err, user) {
    //console.log("Deserialized User: "+user);
    done(err, user);
  });
});

/**
 * Checks if User is logged in via checking for req.user
 * @param failureRedirect Redirect Route in case of failure
 * @returns {function(...[*]=)} Middleware Function (req,res,next)
 */
exports.checkLogin = function(failureRedirect){
  return function (req, res, next) {
    if(req.user){
      console.log("Active Session");
      next();
    }else{
      console.log("No session");
      res.redirect(failureRedirect);
    }
  }
};

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
    if (list.length <= 0) {
      return storeUserCredentials(username, password, callback);
    } else {
      console.warn("Password Constraint not matched!" + list);
      return callback(null, false,
          {
            message: 'Password Constraint not matched',
            failedConstraints: list
          });
    }
  });
};

/**
 * Checks if usechoosen password meets all constraints. (Should also be prechecked
 * on client side for better UX)
 *
 * @param password plainText password to check for constraints
 * @returns {string[]} List of all failed Constraints. Empty if all constraints are met.
 */
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
function validPassword(user, password, callback) {
  bcrypt.compare(password, user.passwordHash, function (err, result) {
    if (err) {
      console.error(err);
    }
    if (!result) {
      console.warn("Try to Login to %s with wrong password", user.username);
      return callback(null, false, {message: 'Incorrect password.'});
    }
    console.log("User %s logged in successful", user.username);
    return callback(null, user);
  });
}

/**
 * Adding some Pepper to the Password for a more refined taste
 *
 * @param password PlainText password
 * @returns {string} Sha256 Hash in Hex using Pepper as Secret
 */
function pepperPassword(password) {
  return crypto.createHmac('sha256', config.PEPPER).update(
      password).digest('hex');
}

/**
 * Stores given Credential to Databases (Hashes Password in process)
 * @param username Chosen username by User
 * @param password Chosen password by User
 * @param callback callback function(error, StoredUser, AdditonalInfo)
 */
function storeUserCredentials(username, password, callback) {
  const pepperedPW = pepperPassword(password);
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
