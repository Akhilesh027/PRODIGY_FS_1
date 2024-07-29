const userModel = require("../models/userModel");
const { comparePassword, hashPassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // Validations
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already registered. Please login.",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Register user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

// POST LOGIN
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

// Test controller
exports.testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.error("Error in test controller:", error);
    res.send({ error: error.message });
  }
};
