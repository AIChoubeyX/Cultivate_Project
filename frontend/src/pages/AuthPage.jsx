// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { User, Phone, MapPin, LogIn, UserPlus, Eye, EyeOff, Wheat } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

// Real Indian States and Districts
const STATES_DISTRICTS = {
  'West Bengal': ['Kolkata', 'Howrah', 'Hooghly', 'North 24 Parganas', 'South 24 Parganas', 'Murshidabad', 'Nadia', 'Bardhaman'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
  'Haryana': ['Faridabad', 'Gurgaon', 'Ambala', 'Panipat', 'Karnal', 'Sonipat']
};

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);

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

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData(prev => ({ ...prev, state, district: '' }));
    setDistricts(STATES_DISTRICTS[state] || []);
    if (errors.state) {
      setErrors(prev => ({ ...prev, state: '' }));
    }
  };

  const handleRegistration = async () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number (must start with 6-9 and be 10 digits)';
    }
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.village) newErrors.village = 'Village is required';
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

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
        alert(`✅ Registration successful!\n\nFarmer ID: ${result.farmer.farmerId}\n\nRedirecting to login...`);
        setLoginMobile(formData.mobile);
        setMode('login');
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
        // Use the login function from AuthContext
        login(result.token, result.farmer);
        // Navigation to /home happens automatically in AuthContext
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
    setDistricts([]);
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
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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
                    placeholder="10-digit mobile (starts with 6-9)"
                    maxLength="10"
                  />
                </div>
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State / राज्य *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  {Object.keys(STATES_DISTRICTS).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District / जिला *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  disabled={!formData.state}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
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
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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