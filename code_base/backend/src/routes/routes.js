const express = require("express");
const router = express.Router();
const passport = require("passport");

const routeConfig = require("../../config/routeConfig");
const { 
  editUserDetails, 
  getUserDetails, 
  getAllUsers, 
  getUserTickets, 
  getUserAddresses
} = require('../controllers/user_controller');
const { getAllGroups } = require('../controllers/group_controller');

// Require controller modules.
const user_controller = require("../controllers/user_controller");
const auth_controller = require("../controllers/auth_controller");

// Home page
router.get("/", (req, res) => res.send("Welcome"));

// Register & Login & Cookies
router.get(routeConfig.USERS_COOKIE, auth_controller.checkLogin("/"), user_controller.findFromCookie);
router.post(routeConfig.USERS_LOGIN,
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    }));
router.post(routeConfig.USERS_REGISTER, user_controller.register);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(routeConfig.USERS_LOGIN);
  }
}

// Get user by his id
router.get(routeConfig.USER_ID, getUserDetails);
// Edit user details of logged in user 
// TODO: If not logged in, redirect creates a put request but login is a post request.
router.put(routeConfig.USER, isLoggedIn, editUserDetails);
// Get all users from database
router.get(routeConfig.USERS, getAllUsers);
// Get tickets of logged in user from database
router.get(routeConfig.USER_TICKETS, isLoggedIn, getUserTickets);
// Get addresses of logged in user from database
router.get(routeConfig.USER_ADDRESSES, isLoggedIn, getUserAddresses);

// Get all groups from database
router.get(routeConfig.GROUPS, getAllGroups);

module.exports = router;
