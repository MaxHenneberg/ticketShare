const express = require("express");
const router = express.Router();

// Require controller modules.
var user_controller = require("../controllers/user_controller");

router.get("/", (req, res) => res.send("Welcome"));
router.post("/users/login", user_controller.login);
router.post("/users/register", user_controller.register);

module.exports = router;
