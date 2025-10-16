import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { TranslateProvider } from "./context/TranslateContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import WeatherGuide from "./components/WeatherGuide";
import DiseaseDetection from "./components/DiseaseDetection";
import AIChatbot from "./components/AIChatbot";
import MarketPrices from "./components/MarketPrices";


function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <TranslateProvider>
        <div className="min-h-screen bg-white font-poppins">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Protected Routes - Only accessible after login */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/weather"
                element={
                  <ProtectedRoute>
                    <WeatherGuide />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/disease-detection"
                element={
                  <ProtectedRoute>
                    <DiseaseDetection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <AIChatbot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/market-prices"
                element={
                  <ProtectedRoute>
                    <MarketPrices />
                  </ProtectedRoute>
                }
              />

              {/* Catch all - redirect to landing page */}
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

              
            </Routes>
          </AnimatePresence>
        </div>
      </TranslateProvider>
    </AuthProvider>
  );
}

export default App;
