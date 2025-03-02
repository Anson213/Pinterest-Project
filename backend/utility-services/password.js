const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Clearer naming
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing the password'); // Add meaningful error handling
  }
};

// Function to compare a plain-text password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    return isPasswordCorrect; // Simplify return logic
  } catch (error) {
    throw new Error('Error comparing the password'); // Add error handling
  }
};

module.exports = { hashPassword, comparePassword };
