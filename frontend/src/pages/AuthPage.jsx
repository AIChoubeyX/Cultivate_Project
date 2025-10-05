// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, Leaf, Mail, Lock, User, Phone } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!isLogin && !formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!isLogin && !formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!isLogin && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = 'Phone number must be 10 digits';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       login({
//         name: formData.name || 'Farmer',
//         email: formData.email,
//         phone: formData.phone
//       });
//       setIsLoading(false);
//       navigate('/home');
//     }, 1500);
//   };

//   const inputVariants = {
//     focus: { scale: 1.02, transition: { duration: 0.2 } },
//     blur: { scale: 1, transition: { duration: 0.2 } }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           animate={{ 
//             rotate: [0, 360],
//             scale: [1, 1.1, 1]
//           }}
//           transition={{ 
//             duration: 20, 
//             repeat: Infinity, 
//             ease: "linear" 
//           }}
//           className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{ 
//             rotate: [360, 0],
//             scale: [1, 1.2, 1]
//           }}
//           transition={{ 
//             duration: 25, 
//             repeat: Infinity, 
//             ease: "linear" 
//           }}
//           className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
//         />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 w-full max-w-md"
//       >
//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
//           {/* Logo and Header */}
//           <div className="text-center mb-8">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-lg mb-4 mx-auto"
//             >
//               <Leaf className="w-10 h-10 text-white" />
//             </motion.div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               Welcome to <span className="text-green-600">Kissan</span>
//             </h1>
//             <p className="text-gray-600">
//               {isLogin ? 'Sign in to your account' : 'Create your farming account'}
//             </p>
//           </div>

//           {/* Toggle Buttons */}
//           <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
//                 isLogin
//                   ? 'bg-white text-green-600 shadow-md'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
//                 !isLogin
//                   ? 'bg-white text-green-600 shadow-md'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <AnimatePresence mode="wait">
//               {!isLogin && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="relative">
//                     <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <motion.input
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       type="text"
//                       name="name"
//                       placeholder="Full Name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="relative">
//               <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <motion.input
//                 variants={inputVariants}
//                 whileFocus="focus"
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             <AnimatePresence mode="wait">
//               {!isLogin && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="relative">
//                     <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <motion.input
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       type="tel"
//                       name="phone"
//                       placeholder="Phone Number"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
//                     />
//                     {errors.phone && (
//                       <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <motion.input
//                 variants={inputVariants}
//                 whileFocus="focus"
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             <AnimatePresence mode="wait">
//               {!isLogin && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="relative">
//                     <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <motion.input
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       type={showPassword ? 'text' : 'password'}
//                       name="confirmPassword"
//                       placeholder="Confirm Password"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
//                     />
//                     {errors.confirmPassword && (
//                       <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {isLogin && (
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="text-green-600 hover:text-green-700 font-medium transition-colors"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             )}

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
//                 </div>
//               ) : (
//                 isLogin ? 'Sign In' : 'Create Account'
//               )}
//             </motion.button>
//           </form>

//           {/* Footer */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600">
//               {isLogin ? "Don't have an account? " : "Already have an account? "}
//               <button
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-green-600 hover:text-green-700 font-semibold transition-colors"
//               >
//                 {isLogin ? 'Sign Up' : 'Sign In'}
//               </button>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default AuthPage;

// 
import React, { useState } from 'react';
import { Upload, CheckCircle, User, Phone, MapPin, LogIn, UserPlus } from 'lucide-react';

const AuthPage = () => {
  // ===== STATE MANAGEMENT =====
  // This controls which screen the user sees: 'choice', 'login', or 'register'
  const [mode, setMode] = useState('choice');
  
  // This tracks the current step in registration (1, 2, or 3)
  const [step, setStep] = useState(1);
  
  // This stores all the form data the farmer enters
  const [formData, setFormData] = useState({
    name: '',
    aadhaarNumber: '',
    mobile: '',
    village: '',
    district: '',
    state: '',
    landSize: ''
  });
  
  // This stores the uploaded Aadhaar XML/ZIP file
  const [aadhaarFile, setAadhaarFile] = useState(null);
  
  // This stores any error messages to show the user
  const [errors, setErrors] = useState({});
  
  // This tracks if Aadhaar verification was successful
  const [isVerified, setIsVerified] = useState(false);
  
  // For login: stores the mobile number entered
  const [loginMobile, setLoginMobile] = useState('');
  
  // For login: shows success message and farmer data after login
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [farmerData, setFarmerData] = useState(null);

  // ===== VALIDATION FUNCTIONS =====
  
  // This function checks if an Aadhaar number is valid
  // Aadhaar must be 12 digits and start with 2-9 (not 0 or 1)
  const validateAadhaar = (number) => {
    const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
    return aadhaarRegex.test(number.replace(/\s/g, ''));
  };

  // This function checks if a mobile number is valid
  // Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9
  const validateMobile = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  // ===== INPUT HANDLERS =====
  
  // This handles changes to regular input fields (name, village, etc.)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the formData state with the new value
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear any error message for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // This specifically handles Aadhaar input and formats it nicely
  // Example: "123456789012" becomes "1234 5678 9012"
  const handleAadhaarChange = (e) => {
    let value = e.target.value.replace(/\s/g, ''); // Remove all spaces
    if (value.length <= 12 && /^\d*$/.test(value)) { // Only allow digits, max 12
      // Split into groups of 4 and join with spaces
      value = value.match(/.{1,4}/g)?.join(' ') || value;
      setFormData(prev => ({ ...prev, aadhaarNumber: value }));
      if (errors.aadhaarNumber) {
        setErrors(prev => ({ ...prev, aadhaarNumber: '' }));
      }
    }
  };

  // This handles the Aadhaar file upload (XML or ZIP)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file has correct extension
      if (file.name.endsWith('.xml') || file.name.endsWith('.zip')) {
        setAadhaarFile(file);
        setErrors(prev => ({ ...prev, file: '' }));
      } else {
        setErrors(prev => ({ ...prev, file: 'Please upload .xml or .zip file only' }));
      }
    }
  };

  // ===== VERIFICATION & REGISTRATION =====
  
  // This function verifies the uploaded Aadhaar file
  const handleOfflineVerification = async () => {
    const newErrors = {};
    
    // Validate all required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateAadhaar(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Invalid Aadhaar number';
    }
    if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }
    if (!aadhaarFile) newErrors.file = 'Please upload Aadhaar PDF file';

    // If there are errors, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ===== THIS IS WHERE YOU'LL CALL YOUR BACKEND API =====
    // In production, this would send the file to your server
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('aadhaarFile', aadhaarFile);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('aadhaarNumber', formData.aadhaarNumber.replace(/\s/g, ''));
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('village', formData.village);
      formDataToSend.append('district', formData.district);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('landSize', formData.landSize);
      
      const response = await fetch('http://localhost:5000/api/farmer/register', {
        method: 'POST',
        body: formDataToSend
        // Don't set Content-Type header - browser will set it automatically with boundary
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsVerified(true);
        alert('Aadhaar verified successfully from PDF!');
        setStep(3);
      } else {
        setErrors({ file: result.error || 'Verification failed' });
      }
    } catch (error) {
      console.error('Verification error:', error);
      setErrors({ file: 'Failed to verify. Please check if backend is running.' });
    }
    
    // For demo purposes without backend, uncomment below:
    /*
    console.log('Verifying Aadhaar PDF:', aadhaarFile.name);
    console.log('Farmer data:', formData);
    
    setIsVerified(true);
    alert('Aadhaar verified successfully!');
    setStep(3);
    */
  };

  // This function completes the registration process
  const completeRegistration = async () => {
    const newErrors = {};
    
    // Validate location fields
    if (!formData.village.trim()) newErrors.village = 'Village is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Since we already sent all data in verification step,
    // we just need to show success message
    const farmerId = 'FR' + Date.now();
    console.log('Registration completed:', { ...formData, farmerId });
    alert(`✅ Registration successful!\n\nYour Farmer ID is: ${farmerId}\n\nPlease save this ID for future login.`);
    
    // Reset to choice screen
    setMode('choice');
    setStep(1);
    setFormData({
      name: '',
      aadhaarNumber: '',
      mobile: '',
      village: '',
      district: '',
      state: '',
      landSize: ''
    });
    setAadhaarFile(null);
    setIsVerified(false);
  };

  // ===== LOGIN FUNCTIONALITY =====
  
  // This function handles farmer login using mobile number
  const handleLogin = async () => {
    if (!validateMobile(loginMobile)) {
      setErrors({ login: 'Please enter a valid mobile number' });
      return;
    }

    // ===== THIS IS WHERE YOU'LL CALL YOUR BACKEND API =====
    /*
    const response = await fetch('http://localhost:5000/api/farmer/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: loginMobile })
    });
    
    const result = await response.json();
    
    if (result.success) {
      setFarmerData(result.data);
      setLoginSuccess(true);
    } else {
      setErrors({ login: 'No farmer found with this mobile number' });
    }
    */
    
    // For demo purposes, simulate finding a farmer
    console.log('Login attempt with mobile:', loginMobile);
    
    // Simulate farmer data
    setFarmerData({
      id: 'FR1234567890',
      name: 'Ramesh Kumar',
      mobile: loginMobile,
      village: 'Rampur',
      district: 'Murshidabad',
      state: 'West Bengal',
      landSize: 2.5,
      status: 'verified',
      registeredOn: '2025-01-15'
    });
    setLoginSuccess(true);
  };

  // This function logs out the farmer
  const handleLogout = () => {
    setLoginSuccess(false);
    setFarmerData(null);
    setLoginMobile('');
    setMode('choice');
  };

  // ===== RENDER FUNCTIONS =====

  // Initial choice screen: Register or Login
  if (mode === 'choice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
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
              <span>Existing Farmer Login / लॉगिन करें</span>
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <strong>Note:</strong> This system uses Aadhaar PDF upload for verification
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Login screen
  if (mode === 'login') {
    if (loginSuccess && farmerData) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-green-700">Welcome Back!</h2>
              <p className="text-gray-600">स्वागत है</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Farmer ID</p>
                <p className="text-lg font-semibold text-gray-800">{farmerData.id}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Name / नाम</p>
                <p className="text-lg font-semibold text-gray-800">{farmerData.name}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Mobile / मोबाइल</p>
                <p className="text-lg font-semibold text-gray-800">{farmerData.mobile}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Location / स्थान</p>
                <p className="text-lg font-semibold text-gray-800">
                  {farmerData.village}, {farmerData.district}, {farmerData.state}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Land Size / भूमि का आकार</p>
                <p className="text-lg font-semibold text-gray-800">{farmerData.landSize} acres</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-600">Status / स्थिति</p>
                <p className="text-lg font-semibold text-green-700 capitalize">{farmerData.status}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Logout / लॉगआउट
            </button>
          </div>
        </div>
      );
    }

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
              {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login / लॉगिन करें
            </button>

            <button
              onClick={() => setMode('choice')}
              className="w-full text-gray-600 py-2 text-sm hover:underline"
            >
              ← Back to Home / वापस जाएं
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800 text-center">
              Use the mobile number you registered with
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Registration flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-700 mb-2">Farmer Registration</h1>
            <p className="text-gray-600">किसान पंजीकरण (PDF Upload)</p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="text-xs mt-1">Basic Info</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 self-center mx-2" style={{ marginTop: '-20px' }}></div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="text-xs mt-1">Verification</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 self-center mx-2" style={{ marginTop: '-20px' }}></div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="text-xs mt-1">Complete</span>
            </div>
          </div>

          {/* Step 1: Basic Information & File Upload */}
          {step === 1 && (
            <div className="space-y-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Number / आधार नंबर *
                </label>
                <input
                  type="text"
                  value={formData.aadhaarNumber}
                  onChange={handleAadhaarChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="XXXX XXXX XXXX"
                  maxLength="14"
                />
                {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>}
              </div>

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

              <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center bg-green-50">
                <Upload className="mx-auto text-green-600 mb-2" size={40} />
                <p className="text-sm text-gray-700 font-medium mb-2">Upload Aadhaar PDF</p>
                <p className="text-xs text-gray-600 mb-4">आधार पीडीएफ अपलोड करें</p>
                
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="aadhaar-file"
                />
                
                <label
                  htmlFor="aadhaar-file"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-colors"
                >
                  Choose PDF File / पीडीएफ चुनें
                </label>
                
                {aadhaarFile && (
                  <div className="mt-3 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">✓ File Selected:</p>
                    <p className="text-xs text-green-600 mt-1">{aadhaarFile.name}</p>
                    <p className="text-xs text-gray-600">Size: {(aadhaarFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}
                
                {errors.file && (
                  <div className="mt-3 p-3 bg-red-100 rounded-lg">
                    <p className="text-sm text-red-700">{errors.file}</p>
                  </div>
                )}
                
                {!aadhaarFile && !errors.file && (
                  <p className="text-xs text-gray-500 mt-3">Max file size: 10MB</p>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>How to get Aadhaar PDF:</strong><br />
                  • Download from DigiLocker app<br />
                  • Or visit myaadhaar.uidai.gov.in → Download e-Aadhaar<br />
                  • Or use physical Aadhaar card photo/scan
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  <strong>Debug Info:</strong><br />
                  File selected: {aadhaarFile ? 'Yes' : 'No'}<br />
                  {aadhaarFile && `File name: ${aadhaarFile.name}`}<br />
                  {aadhaarFile && `File type: ${aadhaarFile.type}`}<br />
                  {aadhaarFile && `File size: ${aadhaarFile.size} bytes`}
                </p>
              </div>

              <button
                onClick={handleOfflineVerification}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Verify & Continue / सत्यापित करें
              </button>

              <button
                onClick={() => setMode('choice')}
                className="w-full text-gray-600 py-2 text-sm hover:underline"
              >
                ← Cancel / रद्द करें
              </button>
            </div>
          )}

          {/* Step 3: Complete Registration */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={24} />
                  <span className="text-green-700 font-medium">Aadhaar Verified Successfully!</span>
                </div>
              </div>

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
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Haryana">Haryana</option>
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land Size (in acres) / भूमि का आकार (optional)
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

              <button
                onClick={completeRegistration}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Complete Registration / पंजीकरण पूर्ण करें
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;