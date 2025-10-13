


import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import bgimage from '../assets/assests.jpeg';
import FarmingFeatures from '../components/FarmingFeatures';
import Footer from '../components/Footer';

function LandingPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation('landing');

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
      {/* 🌾 Hero Section with Image and Text Overlay */}
      <section className="relative w-full h-[90vh] flex items-center justify-center text-center">
        {/* 🖼️ Hero Section Image */}
        <div className="absolute inset-0">
          <img src={bgimage} alt="Farming" className="w-full h-full object-cover opacity-60" />
        </div>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t('hero.appName')}
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8">{t('hero.tagline')}</p>
          <p className="text-lg text-green-50 mb-10">{t('hero.description')}</p>

          <div className="flex justify-center space-x-6">
            <Link to="/home" onClick={handleGetStarted}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-green-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-green-700 transition-all duration-300"
              >
                {t('hero.getStarted')}
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-white text-green-700 font-semibold rounded-2xl shadow-lg border-2 border-green-200 hover:border-green-400 transition-all duration-300"
            >
              {t('hero.learnMore')}
            </motion.button>
          </div>
        </div>
      </section>

      {/* 🌟 Features Section - Now imported from FarmingFeatures component */}
      <FarmingFeatures />

      {/* 📊 Stats Section */}
      <Footer />
      
    </div>
  );
}

export default LandingPage;