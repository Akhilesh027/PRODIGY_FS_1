// Import required modules using CommonJS syntax
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const sequelize = require("./config/db.js"); // Importing sequelize as a module
const authRoutes = require("./routes/authRoute.js"); // Importing authRoutes as a module

// Configure dotenv
dotenv.config();

// Create an instance of express
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// Start the server after establishing database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Define the port
    const PORT = process.env.PORT || 8080;
    
    // Start the server
    app.listen(PORT, () => {
      console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
      );
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
