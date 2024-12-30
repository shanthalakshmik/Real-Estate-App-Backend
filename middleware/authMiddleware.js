const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify Token
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Restrict Access to Specific Roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Not authorized for this action' });
        }
        next();
    };
};
    
export const protect = (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
                ? req.headers.authorization.split(' ')[1] 
                : null;
  
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  };