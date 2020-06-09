const express = require("express");
const router = express.Router();
const passport = require("passport");

const routeConfig = require("../../config/routeConfig");

// Require controller modules.
const user_controller = require("../controllers/user_controller");
const auth_controller = require("../controllers/auth_controller");

router.get("/", (req, res) => res.send("Welcome"));
router.get(routeConfig.USER_ID, user_controller.findUserById);
router.get(routeConfig.USERS_COOKIE, auth_controller.checkLogin("/"), user_controller.findFromCookie);
router.post(routeConfig.USERS_LOGIN,
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    }));
router.post(routeConfig.USERS_REGISTER, user_controller.register);

module.exports = router;
