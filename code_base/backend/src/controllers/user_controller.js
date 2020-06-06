const User = require('../models/user/user');
const authController = require('auth_controller');
/*
exports.login = function (req, res) {
  res.send("NOT IMPLEMENTED:Login");
};
 */


exports.register = function (req, res) {
  authController.handleRegister(req.username, req.password,
      function (err, user, addInfo) {
        if (err) {
          res.send(err);
        }
        if(!user){
          res.send(addInfo.message);
        }
        res.send(user);
      });
};

/**
 * REST function
 * Finds User by id given in req
 * @param req Request
 * @param res Response
 */
exports.findById = function (req, res) {
  User.findById(req.params.id, {}, function (err, result) {
    if (err) {
      res.statusCode = 400;
      console.error(err);
      res.send(err);
    }
    if (!result) {
      res.statusCode = 404;
      res.send(result);
      return;
    }
    res.send(result);
  })
};
