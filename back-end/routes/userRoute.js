const express = require("express");
const router = express.Router();
const {
  handleUserSignUp,
  handleUserLogin,
  handleLogout,
  handleGetProfile,
} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);

router.get("/logout", auth, handleLogout);
router.get("/profile", auth, handleGetProfile);

module.exports = router;
