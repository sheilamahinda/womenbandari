const express = require("express");
const {
  getOtherUser,
  login,
  logout,
  register,
} = require("../controller/userController.js");
const isAuthenticated = require("../middleware/isAuthenticated.js");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated, getOtherUser);

module.exports = router;
