const express = require("express");
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController.js");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");

// Create a router instance
const router = express.Router();

// Define routes
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// Test routes
router.get("/test", requireSignIn, isAdmin, testController);

module.exports = router;
