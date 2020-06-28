const express = require("express");
const router = express.Router();
const passport = require("passport");
const routeConfig = require("../../config/routeConfig");

// Require controller modules.
const user_controller = require("../controllers/user_controller");
const auth_controller = require("../controllers/auth_controller");
const group_controller = require("../controllers/group_controller");
const currency_controller = require("../controllers/currency_controller");

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
// router.post(routeConfig.CREATE_GROUP, auth_controller.checkLogin("/"), group_controller.validate('create'), group_controller.create);
// router.get(routeConfig.CURRENCY, auth_controller.checkLogin("/"), currency_controller.getAll);
// router.post(routeConfig.CREATE_GROUP, group_controller.validate('create'), group_controller.create);
router.post(routeConfig.CREATE_GROUP, group_controller.validate('create'), group_controller.create);
router.get(routeConfig.CURRENCY, currency_controller.getAll);

module.exports = router;