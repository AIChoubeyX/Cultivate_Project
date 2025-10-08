const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No authentication token provided'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const farmer = await Farmer.findOne({ 
      _id: decoded.id,
      status: 'active'
    }).select('-password');
    
    if (!farmer) {
      return res.status(401).json({
        success: false,
        error: 'Invalid authentication token'
      });
    }
    
    req.farmer = farmer;
    req.farmerId = farmer._id;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      error: 'Please authenticate'
    });
  }
};

module.exports = auth;
