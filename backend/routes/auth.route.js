const express = require("express");

const {
  signup,
  login,
  logout,
  getMe,
} = require("../controllers/auth.controller.js");
const protectRoute = require("../middleware/protectRoute.js");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);

module.exports = router;
