import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { User, Phone, MapPin, LogIn, UserPlus, Eye, EyeOff, Edit2, Save, X, LogOut, Wheat } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const AuthPage = () => {
  const [mode, setMode] = useState('choice');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    village: '',
    district: '',
    state: '',
    landSize: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('farmerToken'));
  const [farmer, setFarmer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/farmer/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setFarmer(data.farmer);
        setMode('profile');
      } else {
        localStorage.removeItem('farmerToken');
        setToken(null);
      }
    } catch (error) {
      console.error('Fetch profile error:', error);
    }
  };

  const validateMobile = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegistration = async () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.village) newErrors.village = 'Village is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.state) newErrors.state = 'State is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/farmer/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          village: formData.village,
          district: formData.district,
          state: formData.state,
          landSize: formData.landSize || '0',
          password: formData.password
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`✅ Registration successful!\n\nFarmer ID: ${result.farmer.farmerId}\n\nPlease login now.`);
        navigate("/home"); // redirect to homepage
        setMode('choice');
        resetForm();
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('❌ Registration failed. Please check if backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateMobile(loginMobile)) {
      setErrors({ login: 'Please enter a valid mobile number' });
      return;
    }
    if (!loginPassword) {
      setErrors({ login: 'Please enter password' });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mobile: loginMobile,
          password: loginPassword 
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('farmerToken', result.token);
        setToken(result.token);
        setFarmer(result.farmer);
        setMode('profile');
        navigate("/home"); // redirect to homepage
        alert('✅ Login successful!');
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌ Login failed. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('farmerToken');
    setToken(null);
    setFarmer(null);
    setMode('choice');
    setLoginMobile('');
    setLoginPassword('');
  };

  const startEditing = () => {
    setEditData({
      name: farmer.name,
      village: farmer.village,
      district: farmer.district,
      state: farmer.state,
      landSize: farmer.landSize || '',
      primaryCrops: farmer.primaryCrops?.join(', ') || ''
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditData({});
  };

  const saveProfile = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/farmer/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editData.name,
          village: editData.village,
          district: editData.district,
          state: editData.state,
          landSize: editData.landSize,
          primaryCrops: editData.primaryCrops.split(',').map(c => c.trim()).filter(Boolean)
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setFarmer(result.farmer);
        setIsEditing(false);
        alert('✅ Profile updated successfully!');
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      alert('❌ Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      mobile: '',
      village: '',
      district: '',
      state: '',
      landSize: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  // Choice Screen
  if (mode === 'choice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-600 p-4 rounded-full">
                <Wheat className="text-white" size={48} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">Farmer Portal</h1>
            <p className="text-gray-600">किसान पोर्टल</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setMode('register')}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <UserPlus size={24} />
              <span>New Registration / नया पंजीकरण</span>
            </button>

            <button
              onClick={() => setMode('login')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <LogIn size={24} />
              <span>Login / लॉगिन</span>
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <strong>Simple & Easy</strong><br />
              Register with just mobile & password
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (mode === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Farmer Login</h2>
            <p className="text-gray-600">किसान लॉगिन</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number / मोबाइल नंबर *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={loginMobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setLoginMobile(value);
                      setErrors({});
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password / पासवर्ड *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setErrors({});
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Login / लॉगिन करें'}
            </button>

            <button
              onClick={() => {
                setMode('choice');
                setLoginMobile('');
                setLoginPassword('');
                setErrors({});
              }}
              className="w-full text-gray-600 py-2 text-sm hover:underline"
            >
              ← Back / वापस जाएं
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Profile Screen
  if (mode === 'profile' && farmer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-green-700">My Profile</h2>
                <p className="text-gray-600">मेरी प्रोफ़ाइल</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Farmer ID Card */}
              <div className="md:col-span-2 bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-90">Farmer ID</p>
                    <p className="text-2xl font-bold">{farmer.farmerId}</p>
                    <p className="text-lg mt-2">{farmer.name}</p>
                    <p className="text-sm opacity-90">{farmer.mobile}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Status</p>
                    <span className="bg-white text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {farmer.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-700">Personal Information</h3>
                  {!isEditing && (
                    <button
                      onClick={startEditing}
                      className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Edit2 size={16} />
                      <span className="text-sm">Edit</span>
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={editData.village}
                      onChange={(e) => setEditData({...editData, village: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Village"
                    />
                    <input
                      type="text"
                      value={editData.district}
                      onChange={(e) => setEditData({...editData, district: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="District"
                    />
                    <select
                      value={editData.state}
                      onChange={(e) => setEditData({...editData, state: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select State</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Name:</span> <span className="font-medium">{farmer.name}</span></p>
                    <p><span className="text-gray-600">Mobile:</span> <span className="font-medium">{farmer.mobile}</span></p>
                    <p><span className="text-gray-600">Village:</span> <span className="font-medium">{farmer.village}</span></p>
                    <p><span className="text-gray-600">District:</span> <span className="font-medium">{farmer.district}</span></p>
                    <p><span className="text-gray-600">State:</span> <span className="font-medium">{farmer.state}</span></p>
                  </div>
                )}
              </div>

              {/* Farming Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Farming Details</h3>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="number"
                      value={editData.landSize}
                      onChange={(e) => setEditData({...editData, landSize: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Land Size (acres)"
                      step="0.01"
                    />
                    <input
                      type="text"
                      value={editData.primaryCrops}
                      onChange={(e) => setEditData({...editData, primaryCrops: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Crops (comma separated)"
                    />
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Land Size:</span> <span className="font-medium">{farmer.landSize || '0'} acres</span></p>
                    <p><span className="text-gray-600">Primary Crops:</span></p>
                    {farmer.primaryCrops && farmer.primaryCrops.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {farmer.primaryCrops.map((crop, idx) => (
                          <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                            {crop}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs">Not specified</span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="md:col-span-2 flex space-x-3">
                  <button
                    onClick={saveProfile}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:bg-gray-400"
                  >
                    <Save size={20} />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}

              {/* Registration Date */}
              <div className="md:col-span-2 text-center text-sm text-gray-600">
                <p>Registered on: {new Date(farmer.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration Screen
  if (mode === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-700 mb-2">Farmer Registration</h1>
              <p className="text-gray-600">किसान पंजीकरण</p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name / पूरा नाम *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number / मोबाइल नंबर *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                  />
                </div>
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>

              {/* Village */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Village / गाँव *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter village name"
                  />
                </div>
                {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village}</p>}
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District / जिला *
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter district"
                />
                {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State / राज्य *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Haryana">Haryana</option>
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              {/* Land Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land Size (acres) / भूमि का आकार (optional)
                </label>
                <input
                  type="number"
                  name="landSize"
                  value={formData.landSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter land size"
                  step="0.01"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password / पासवर्ड *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Minimum 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password / पासवर्ड की पुष्टि करें *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Re-enter password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleRegistration}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400"
              >
                {loading ? 'Registering...' : 'Complete Registration / पंजीकरण पूर्ण करें'}
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => {
                  setMode('choice');
                  resetForm();
                }}
                className="w-full text-gray-600 py-2 text-sm hover:underline"
              >
                ← Cancel / रद्द करें
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthPage;