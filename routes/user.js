const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/users.js")

router.route("/signup")
.get(userController.renderSignup )
.post(
  wrapAsync(userController.signup)
);

router.route("/login")
.get(userController.renderLogin)
.post(
 
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout",isLoggedIn,userController.logout)
module.exports = router;
