const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');
const auth = require('../middleware/auth');

// Login with Mobile & Password
router.post('/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;
    
    // Validate input
    if (!mobile || !password) {
      return res.status(400).json({
        success: false,
        error: 'Mobile and password are required'
      });
    }
    
    // Validate mobile format
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid mobile number format'
      });
    }
    
    // Find farmer
    const farmer = await Farmer.findOne({ mobile, status: 'active' });
    
    if (!farmer) {
      return res.status(401).json({
        success: false,
        error: 'Invalid mobile number or password'
      });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, farmer.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid mobile number or password'
      });
    }
    
    // Update last login
    farmer.lastLogin = new Date();
    await farmer.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: farmer._id, mobile: farmer.mobile },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    // Return success
    res.json({
      success: true,
      message: 'Login successful',
      token,
      farmer: {
        id: farmer._id,
        farmerId: farmer.farmerId,
        name: farmer.name,
        mobile: farmer.mobile,
        village: farmer.village,
        district: farmer.district,
        state: farmer.state,
        landSize: farmer.landSize,
        primaryCrops: farmer.primaryCrops,
        status: farmer.status,
        createdAt: farmer.createdAt
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed. Please try again.'
    });
  }
});

// Get Current User
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      farmer: req.farmer
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
});

// Logout
router.post('/logout', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Logout failed'
    });
  }
});

module.exports = router;
