const User = require('../data-models/userSchema')
//Util-> Make token generator and verifier yourself
const {generateAccessToken, generateRefreshToken, decodeAccessToken, decodeRefreshToken} = require('../utility-services/jsonTokens');
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
      const passwordCorrect = await comparePassword(password, user.password);
      if (user && passwordCorrect) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          refreshToken: generateRefreshToken(user._id),
          accessToken: generateAccessToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  const refreshToken = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
          return res.status(401).json({ message: 'Access denied, token missing!' });
      }

      const refreshToken = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
          
      if (!refreshToken) {
        return res.status(401).json({ message: 'Access denied, token missing!' });
      }

      const token = decodeRefreshToken(refreshToken)

      const user = await User.findById(token.id);
      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }
  
      const accessToken = generateAccessToken(user._id);
      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

   const deleteUser = async (req, res) => {
    try{
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
          return res.status(401).json({ message: 'Access denied, token missing!' });
      }

      const accessToken = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
     
      if (!accessToken) {
        return res.status(401).json({ message: 'Access denied, token missing!' });
      }

        const decoded = decodeAccessToken(accessToken);
        if (!decoded || !decoded.id) {
          return res.status(403).json({ message: 'Invalid or expired token' });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await User.deleteOne({ _id: decoded.id });

      res.status(200).json({ message: 'User deleted successfully' });

    } catch (error){
      res.status(500).json({ message: 'Server error' });
    }
   }

  module.exports = {registerUser, loginUser, refreshToken, deleteUser};
  
  //logoutUser can be implemented in the frontend as it's easier