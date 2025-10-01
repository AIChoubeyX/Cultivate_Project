// import { Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
// import HomePage from './pages/HomePage';
// import AuthPage from './pages/AuthPage';
// import WeatherGuide from './components/WeatherGuide';
// import DiseaseDetection from './components/DiseaseDetection';
// import AIChatbot from './components/AIChatbot';
// import MarketPrices from './components/MarketPrices';
// import { AuthProvider } from './context/AuthContext';

// function App() {
//   const location = useLocation();

//   return (
//     <AuthProvider>
//       <div className="min-h-screen bg-white font-inter">
//         <Navbar />
//         <AnimatePresence mode="wait">
//           <Routes location={location} key={location.pathname}>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/home" element={<HomePage />} />
//             <Route path="/weather" element={<WeatherGuide />} />
//             <Route path="/disease-detection" element={<DiseaseDetection />} />
//             <Route path="/chatbot" element={<AIChatbot />} />
//             <Route path="/market-prices" element={<MarketPrices />} />
//           </Routes>
//         </AnimatePresence>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.jsx
// src/App.jsx
// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TranslateProvider } from './context/TranslateContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import WeatherGuide from './components/WeatherGuide';
import DiseaseDetection from './components/DiseaseDetection';
import AIChatbot from './components/AIChatbot';
import MarketPrices from './components/MarketPrices';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <TranslateProvider>
        <div className="min-h-screen bg-white font-poppins">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/weather" element={<WeatherGuide />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/chatbot" element={<AIChatbot />} />
              <Route path="/market-prices" element={<MarketPrices />} />
            </Routes>
          </AnimatePresence>
        </div>
      </TranslateProvider>
    </AuthProvider>
  );
}

export default App;