const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Farmer = require('../models/Farmer');
const auth = require('../middleware/auth');

// Register New Farmer
router.post('/register', async (req, res) => {
  try {
    const { name, mobile, village, district, state, landSize, password } = req.body;
    
    console.log('Registration request:', { name, mobile, village, district, state });
    
    // Validate required fields
    if (!name || !mobile || !village || !district || !state || !password) {
      return res.status(400).json({
        success: false,
        error: 'All required fields must be provided'
      });
    }
    
    // Validate mobile format
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid mobile number format'
      });
    }
    
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters'
      });
    }
    
    // Check if mobile already exists
    const existingFarmer = await Farmer.findOne({ mobile });
    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        error: 'Mobile number already registered'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create farmer
    const farmer = await Farmer.create({
      name,
      mobile,
      village,
      district,
      state,
      landSize: landSize ? parseFloat(landSize) : 0,
      password: hashedPassword
    });
    
    console.log('Farmer registered:', farmer.farmerId);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful! Please login.',
      farmer: {
        farmerId: farmer.farmerId,
        name: farmer.name,
        mobile: farmer.mobile,
        village: farmer.village,
        district: farmer.district,
        state: farmer.state
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Mobile number already registered'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Registration failed. Please try again.'
    });
  }
});

// Get Farmer Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.farmerId).select('-password');
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.json({
      success: true,
      farmer: farmer
    });
    
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
});

// Update Farmer Profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, village, district, state, pincode, landSize, primaryCrops } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (village) updates.village = village;
    if (district) updates.district = district;
    if (state) updates.state = state;
    if (pincode) updates.pincode = pincode;
    if (landSize !== undefined) updates.landSize = parseFloat(landSize);
    if (primaryCrops) updates.primaryCrops = Array.isArray(primaryCrops) ? primaryCrops : [primaryCrops];
    
    const farmer = await Farmer.findByIdAndUpdate(
      req.farmerId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        error: 'Farmer not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      farmer: farmer
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
});

// Change Password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current and new password are required'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters'
      });
    }
    
    const farmer = await Farmer.findById(req.farmerId);
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, farmer.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    farmer.password = hashedPassword;
    await farmer.save();
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
    
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to change password'
    });
  }
});

// Search Farmers
router.get('/search', async (req, res) => {
  try {
    const { mobile, village, district, state, page = 1, limit = 10 } = req.query;
    
    const query = { status: 'active' };
    if (mobile) query.mobile = mobile;
    if (village) query.village = new RegExp(village, 'i');
    if (district) query.district = new RegExp(district, 'i');
    if (state) query.state = state;
    
    const farmers = await Farmer.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Farmer.countDocuments(query);
    
    res.json({
      success: true,
      farmers: farmers,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
    
  } catch (error) {
    console.error('Search farmers error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
});

// Get Statistics
router.get('/stats', async (req, res) => {
  try {
    const totalFarmers = await Farmer.countDocuments({ status: 'active' });
    
    const stateWise = await Farmer.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$state',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    const districtWise = await Farmer.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$district',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    res.json({
      success: true,
      stats: {
        total: totalFarmers,
        stateWise: stateWise,
        districtWise: districtWise
      }
    });
    
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;
