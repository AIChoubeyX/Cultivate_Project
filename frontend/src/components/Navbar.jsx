// import { useState, Fragment } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDown, Menu as MenuIcon, X, Leaf, User, LogOut } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const languages = [
//   { code: 'en', name: 'English', flag: '🇺🇸' },
//   { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
//   { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
//   { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
//   { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
//   { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
// ];

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
//   const { isLoggedIn, user, login, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate('/auth');
//   };

//   return (
//     <motion.nav
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: 'easeOut' }}
//       className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <motion.div
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//               className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg"
//             >
//               <Leaf className="w-6 h-6 text-white" />
//             </motion.div>
//             <span className="text-2xl font-bold text-gray-800">Kissan</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {/* Language Dropdown */}
//             <Menu as="div" className="relative">
//               <Menu.Button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
//                 <span>{selectedLanguage.flag}</span>
//                 <span>{selectedLanguage.name}</span>
//                 <ChevronDown className="w-4 h-4" />
//               </Menu.Button>
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
//                   {languages.map((language) => (
//                     <Menu.Item key={language.code}>
//                       {({ active }) => (
//                         <button
//                           onClick={() => setSelectedLanguage(language)}
//                           className={`${
//                             active ? 'bg-green-50 text-green-700' : 'text-gray-700'
//                           } group flex items-center w-full px-4 py-3 text-sm transition-colors duration-150`}
//                         >
//                           <span className="mr-3">{language.flag}</span>
//                           {language.name}
//                         </button>
//                       )}
//                     </Menu.Item>
//                   ))}
//                 </Menu.Items>
//               </Transition>
//             </Menu>

//             {/* Auth Button */}
//             {isLoggedIn ? (
//               <Menu as="div" className="relative">
//                 <Menu.Button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
//                   <User className="w-4 h-4" />
//                   <span>{user?.name}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </Menu.Button>
//                 <Transition
//                   as={Fragment}
//                   enter="transition ease-out duration-100"
//                   enterFrom="transform opacity-0 scale-95"
//                   enterTo="transform opacity-100 scale-100"
//                   leave="transition ease-in duration-75"
//                   leaveFrom="transform opacity-100 scale-100"
//                   leaveTo="transform opacity-0 scale-95"
//                 >
//                   <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
//                     <Menu.Item>
//                       {({ active }) => (
//                         <button
//                           onClick={() => {
//                             logout();
//                             navigate('/');
//                           }}
//                           className={`${
//                             active ? 'bg-red-50 text-red-700' : 'text-gray-700'
//                           } group flex items-center w-full px-4 py-3 text-sm transition-colors duration-150`}
//                         >
//                           <LogOut className="mr-3 w-4 h-4" />
//                           Logout
//                         </button>
//                       )}
//                     </Menu.Item>
//                   </Menu.Items>
//                 </Transition>
//               </Menu>
//             ) : (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleLogin}
//                 className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-green-600 hover:to-green-700"
//               >
//                 Login / Signup
//               </motion.button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <motion.div
//           initial={false}
//           animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className="md:hidden overflow-hidden"
//         >
//           <div className="py-4 space-y-4 border-t border-gray-100">
//             {/* Mobile Language Selection */}
//             <div className="px-2">
//               <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
//               <div className="grid grid-cols-2 gap-2">
//                 {languages.map((language) => (
//                   <button
//                     key={language.code}
//                     onClick={() => setSelectedLanguage(language)}
//                     className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
//                       selectedLanguage.code === language.code
//                         ? 'bg-green-100 text-green-700'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <span>{language.flag}</span>
//                     <span>{language.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Auth */}
//             <div className="px-2">
//               {isLoggedIn ? (
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700">
//                     <User className="w-4 h-4" />
//                     <span>{user?.name}</span>
//                   </div>
//                   <button
//                     onClick={() => {
//                       logout();
//                       navigate('/');
//                       setIsOpen(false);
//                     }}
//                     className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleLogin();
//                     setIsOpen(false);
//                   }}
//                   className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
//                 >
//                   Login / Signup
//                 </button>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.nav>
//   );
// }

// export default Navbar;


// import { useState, Fragment } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDown, Menu as MenuIcon, X, Leaf, User, LogOut } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const languages = [
//   { code: 'en', name: 'English', flag: '🇺🇸' },
//   { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
//   { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
//   { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
//   { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
//   { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
// ];

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
//   const { isLoggedIn, user, login, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate('/auth');
//   };

//   return (
//     <motion.nav
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: 'easeOut' }}
//       className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <motion.div
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//               className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-lg"
//             >
//               <Leaf className="w-6 h-6 text-white" />
//             </motion.div>
//             <span className="text-2xl font-bold text-gray-800">Kissan</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {/* Language Dropdown */}
//             <Menu as="div" className="relative">
//               <Menu.Button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-secondary-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
//                 <span>{selectedLanguage.flag}</span>
//                 <span>{selectedLanguage.name}</span>
//                 <ChevronDown className="w-4 h-4" />
//               </Menu.Button>
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
//                   {languages.map((language) => (
//                     <Menu.Item key={language.code}>
//                       {({ active }) => (
//                         <button
//                           onClick={() => setSelectedLanguage(language)}
//                           className={`${
//                             active ? 'bg-secondary-50 text-secondary-700' : 'text-gray-700'
//                           } group flex items-center w-full px-4 py-3 text-sm transition-colors duration-150`}
//                         >
//                           <span className="mr-3">{language.flag}</span>
//                           {language.name}
//                         </button>
//                       )}
//                     </Menu.Item>
//                   ))}
//                 </Menu.Items>
//               </Transition>
//             </Menu>

//             {/* Auth Button */}
//             {isLoggedIn ? (
//               <Menu as="div" className="relative">
//                 <Menu.Button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-secondary-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
//                   <User className="w-4 h-4" />
//                   <span>{user?.name}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </Menu.Button>
//                 <Transition
//                   as={Fragment}
//                   enter="transition ease-out duration-100"
//                   enterFrom="transform opacity-0 scale-95"
//                   enterTo="transform opacity-100 scale-100"
//                   leave="transition ease-in duration-75"
//                   leaveFrom="transform opacity-100 scale-100"
//                   leaveTo="transform opacity-0 scale-95"
//                 >
//                   <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
//                     <Menu.Item>
//                       {({ active }) => (
//                         <button
//                           onClick={() => {
//                             logout();
//                             navigate('/');
//                           }}
//                           className={`${
//                             active ? 'bg-red-50 text-red-700' : 'text-gray-700'
//                           } group flex items-center w-full px-4 py-3 text-sm transition-colors duration-150`}
//                         >
//                           <LogOut className="mr-3 w-4 h-4" />
//                           Logout
//                         </button>
//                       )}
//                     </Menu.Item>
//                   </Menu.Items>
//                 </Transition>
//               </Menu>
//             ) : (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleLogin}
//                 className="px-6 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-secondary-600 hover:to-secondary-700"
//               >
//                 Login / Signup
//               </motion.button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <motion.div
//           initial={false}
//           animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className="md:hidden overflow-hidden"
//         >
//           <div className="py-4 space-y-4 border-t border-gray-100">
//             {/* Mobile Language Selection */}
//             <div className="px-2">
//               <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
//               <div className="grid grid-cols-2 gap-2">
//                 {languages.map((language) => (
//                   <button
//                     key={language.code}
//                     onClick={() => setSelectedLanguage(language)}
//                     className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
//                       selectedLanguage.code === language.code
//                         ? 'bg-secondary-100 text-secondary-700'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <span>{language.flag}</span>
//                     <span>{language.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Mobile Auth */}
//             <div className="px-2">
//               {isLoggedIn ? (
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700">
//                     <User className="w-4 h-4" />
//                     <span>{user?.name}</span>
//                   </div>
//                   <button
//                     onClick={() => {
//                       logout();
//                       navigate('/');
//                       setIsOpen(false);
//                     }}
//                     className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleLogin();
//                     setIsOpen(false);
//                   }}
//                   className="w-full px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
//                 >
//                   Login / Signup
//                 </button>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.nav>
//   );
// }

// export default Navbar;


// src/components/Navbar.jsx
import { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, Menu as MenuIcon, X, Leaf, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslate } from '../context/TranslateContext'; // 🆕 ADDED

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { currentLanguage, switchLanguage } = useTranslate(); // 🆕 ADDED
  const navigate = useNavigate();

  // 🆕 CHANGED: Get selected language from context
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];

  // 🆕 CHANGED: Handle language change
  const handleLanguageChange = (language) => {
    switchLanguage(language.code);
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-lg"
            >
              <Leaf className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-gray-800">Kissan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-secondary-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <span>{selectedLanguage.flag}</span>
                <span>{selectedLanguage.name}</span>
                <ChevronDown className="w-4 h-4" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                  {languages.map((language) => (
                    <Menu.Item key={language.code}>
                      {({ active }) => (
                        <button
                          onClick={() => handleLanguageChange(language)} // 🆕 CHANGED
                          className={`${
                            active ? 'bg-secondary-50 text-secondary-700' : 'text-gray-700'
                          } ${currentLanguage === language.code ? 'bg-secondary-100' : ''} group flex items-center w-full px-4 py-3 text-sm transition-colors duration-150`}
                        >
                          <span className="mr-3">{language.flag}</span>
                          {language.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Auth Button */}
            {isLoggedIn ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-secondary-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            logout();
                            navigate('/');
                          }}
                          className={`${
                            active ? 'bg-red-50 text-red-700' : 'text-gray-700'
                          } group flex items-center w-full px-4 py-3 text-sm transition-colors duration-150`}
                        >
                          <LogOut className="mr-3 w-4 h-4" />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="px-6 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-secondary-600 hover:to-secondary-700"
              >
                Login / Signup
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-gray-100">
            {/* Mobile Language Selection */}
            <div className="px-2">
              <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language)} // 🆕 CHANGED
                    className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                      currentLanguage === language.code // 🆕 CHANGED
                        ? 'bg-secondary-100 text-secondary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Auth */}
            <div className="px-2">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700">
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;