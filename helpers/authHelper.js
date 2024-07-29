const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error in hashing password:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

exports.comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error in comparing passwords:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
