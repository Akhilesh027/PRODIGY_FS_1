const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Protected Routes token base
exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.error("Error in requireSignIn middleware:", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access",
      error: error.message,
    });
  }
};

// Admin access
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access",
      error: error.message,
    });
  }
};
