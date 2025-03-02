const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '../configurations/.env' });

const generateAccessToken = (id) => {
  return jwt.sign({ id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};


const verifyAccessToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Renamed for clarity
    return decodedToken ? true : false; // Simplified return logic
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'Access token expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { error: 'Invalid access token' };
    }
    return { error: 'Token verification failed' };
  }
};

const verifyRefreshToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET); // Renamed for clarity
    return decodedToken ? true : false; // Simplified return logic
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'Refresh token expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { error: 'Invalid refresh token' };
    }
    return { error: 'Token verification failed' };
  }
  }

  const decodeAccessToken = (token) => {
    try {
      return decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Renamed for clarity
  
      } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return { error: 'Access token expired' };
      } else if (error.name === 'JsonWebTokenError') {
        return { error: 'Invalid access token' };
      }
      return { error: 'Token verification failed' };
    }
  };

  const decodeRefreshToken = (token) => {
    try {
     return decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET); // Renamed for clarity
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return { error: 'Access token expired' };
      } else if (error.name === 'JsonWebTokenError') {
        return { error: 'Invalid access token' };
      }
      return { error: 'Token verification failed' };
    }
  };

module.exports = { verifyAccessToken, verifyRefreshToken,
                   generateAccessToken, generateRefreshToken,
                   decodeAccessToken, decodeRefreshToken
                  };
