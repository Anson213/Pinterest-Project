const User = require('../data-models/userSchema')
//Util-> Make token generator and verifier yourself
const {generateAccessToken, generateRefreshToken} = require('../utility-services/jsonTokens');
const {hashPassword, comparePassword} = require('../utility-services/password');

const registerUser = async ( req, res ) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
    
        const user = await User.create({ name, email, password: hashedPassword });
        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        } else {
          res.status(400).json({ message: 'Invalid user credentials' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      const passwordCorrect = await comparePassword(password, email, User);
      if (user && passwordCorrect) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          refreshToken: generateRefreshToken(user._id),
          accessToken: generateAccessToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  const refreshToken = async (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied, token missing!' });
    }
  
    try {
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }
  
      const accessToken = generateAccessToken(user._id);
      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {registerUser, loginUser, refreshToken};
  
  //logoutUser can be implemented in the frontend as it's easier