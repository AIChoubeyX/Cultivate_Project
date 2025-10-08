const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  
  // Contact Information
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid mobile number']
  },
  
  // Location
  village: {
    type: String,
    required: [true, 'Village is required']
  },
  district: {
    type: String,
    required: [true, 'District is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  pincode: String,
  
  // Farming Details
  landSize: {
    type: Number,
    default: 0
  },
  primaryCrops: [String],
  
  // Farmer ID
  farmerId: {
    type: String,
    unique: true
  },
  
  // Password (hashed)
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  
  // Last Login
  lastLogin: Date,
  
}, {
  timestamps: true
});

// Generate Farmer ID before saving
farmerSchema.pre('save', function(next) {
  if (!this.farmerId) {
    this.farmerId = 'FR' + Date.now() + Math.floor(1000 + Math.random() * 9000);
  }
  next();
});

// Indexes
farmerSchema.index({ mobile: 1 });
farmerSchema.index({ farmerId: 1 });

module.exports = mongoose.model('Farmer', farmerSchema);
