const express = require("express");
const router = express.Router();
const passport = require("passport");
const routeConfig = require("../../config/routeConfig");
const {
  editUserDetails,
  getUserDetails,
  getAllUsers,
  getUserTickets,
  getUserAddresses,
  addAddress,
  editAddress,
  addJoinInformation,
  editJoinInformation,
  getCreatedGroups,
} = require('../controllers/user_controller');
const {getAllGroups} = require('../controllers/group_controller');

// Require controller modules.
const user_controller = require("../controllers/user_controller");
const auth_controller = require("../controllers/auth_controller");
const group_controller = require("../controllers/group_controller");
const join_info_controller = require("../controllers/join_info_controller");
const currency_controller = require("../controllers/currency_controller");

// Home page
router.get("/", (req, res) => res.send("Welcome"));

// Register & Login & Cookies
router.get(routeConfig.USERS_COOKIE, auth_controller.checkLogin("/"), user_controller.findFromCookie);
router.get(routeConfig.USER_LOGIN_FAIL, auth_controller.loginFail);
router.post(routeConfig.USERS_LOGIN, passport.authenticate('local'), function (req, res) {
  res.status = 200;
  res.send(req.user);
});
router.post(routeConfig.USERS_REGISTER, user_controller.register);
// router.post(routeConfig.CREATE_GROUP, auth_controller.checkLogin("/"), group_controller.validate('create'), group_controller.create);
// router.get(routeConfig.CURRENCY, auth_controller.checkLogin("/"), currency_controller.getAll);
// router.post(routeConfig.CREATE_GROUP, group_controller.validate('create'), group_controller.create);
router.get(routeConfig.CURRENCY, currency_controller.getAll);
router.post(routeConfig.CREATE_GROUP, group_controller.validate('create'), group_controller.create);
router.get(routeConfig.GET_GROUP, group_controller.validate('getOne'), group_controller.getOne);
// get free slots left of a group
router.get(routeConfig.GROUP_FREE_SLOTS, join_info_controller.validate('getFreeSlots'), join_info_controller.getFreeSlots);
// get user's created groups
router.get(routeConfig.GetCreatedGroups, getCreatedGroups);
router.get(routeConfig.GetJoinedGroups, join_info_controller.getJoinedGroups);

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
// Add a new address to logged in user
router.post(routeConfig.NEW_ADDRESS, isLoggedIn, addAddress);
// Edit an address of logged in user
router.put(routeConfig.ADDRESS, isLoggedIn, editAddress);
router.get(routeConfig.JOIN_INFO, join_info_controller.updateJoinInfo);
// Add a join information for logged in user
router.post(routeConfig.JOIN_INFO, isLoggedIn, addJoinInformation);
// Edit a join information for logged in user
router.put(routeConfig.JOIN_INFO, isLoggedIn, editJoinInformation);

// Get all groups from database
router.get(routeConfig.GROUP, getAllGroups);

router.get(routeConfig.GROUP_OCCSLOTS, join_info_controller.countOccSlotsForGroup);
router.put(routeConfig.JOIN_INFORMATION, join_info_controller.updateJoinInfo);

router.get(routeConfig.GROUPS_SEARCH, group_controller.searchGroup);

router.post(routeConfig.GROUP_INITJOIN, isLoggedIn, group_controller.initGroupJoin);
router.post(routeConfig.GROUP_REVERT_INITJOIN, isLoggedIn, group_controller.revertInitGroupJoin);
router.get(routeConfig.GROUP_VERFIY_PAYMENT, isLoggedIn, group_controller.verifyPayment);

router.get(routeConfig.JOININFOS_FOR_GROUP, join_info_controller.getJoinInfoByGroup);

module.exports = router;
