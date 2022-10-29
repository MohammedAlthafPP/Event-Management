const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getUserDetails } = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user/:id").get(getUserDetails);
router.route("/logout").get(logout);

module.exports = router;