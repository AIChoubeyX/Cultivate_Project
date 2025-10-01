// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Leaf, Sun, Droplets, Tractor, BarChart3, Users, Shield } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const features = [
//   {
//     icon: Sun,
//     title: 'Weather Insights',
//     description: 'Get accurate weather forecasts and cultivation recommendations for your crops.'
//   },
//   {
//     icon: Droplets,
//     title: 'Smart Irrigation',
//     description: 'Optimize water usage with AI-powered irrigation scheduling and monitoring.'
//   },
//   {
//     icon: Shield,
//     title: 'Disease Detection',
//     description: 'Early detection of plant diseases using advanced image recognition technology.'
//   },
//   {
//     icon: BarChart3,
//     title: 'Market Analytics',
//     description: 'Real-time market prices and trends to maximize your farming profits.'
//   }
// ];

// function LandingPage() {
//   const { login } = useAuth();

//   const handleGetStarted = () => {
//     navigate('/auth');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
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
//           className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"
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
//           className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             y: [-10, 10, -10],
//             x: [-5, 5, -5]
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-200/20 rounded-full blur-2xl"
//         />
//       </div>

//       {/* Hero Section */}
//       <div className="relative z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
//           <div className="text-center">
//             <motion.div
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5, ease: 'easeOut' }}
//               className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-2xl mb-8 mx-auto"
//             >
//               <Leaf className="w-12 h-12 text-white" />
//             </motion.div>

//             <motion.h1
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
//             >
//               <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//                 Kissan
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
//             >
//               AI-Powered Farming Assistant for Every Farmer
//             </motion.p>

//             <motion.p
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
//             >
//               Harness the power of artificial intelligence to optimize your farming operations,
//               increase yields, and make data-driven decisions for a sustainable future.
//             </motion.p>

//             <motion.div
//               initial={{ y: 40, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
//             >
//               <Link to="/home" onClick={handleGetStarted}>
//                 <motion.button
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-green-600 hover:to-green-700"
//                 >
//                   <span>Get Started</span>
//                   <motion.div
//                     whileHover={{ x: 5 }}
//                     transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//                   >
//                     <ArrowRight className="w-5 h-5" />
//                   </motion.div>
//                 </motion.button>
//               </Link>

//               <motion.button
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 bg-white text-green-600 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-200 hover:border-green-300"
//               >
//                 Learn More
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="relative z-10 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//               Empowering Farmers with Technology
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Our comprehensive platform provides everything you need to modernize your farming practices
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//                   className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//         className="relative z-10 py-20 bg-gradient-to-r from-green-500 to-blue-600"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               whileInView={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               viewport={{ once: true }}
//               className="text-white"
//             >
//               <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
//               <div className="text-xl text-green-100">Active Farmers</div>
//             </motion.div>
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               whileInView={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="text-white"
//             >
//               <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
//               <div className="text-xl text-green-100">Accuracy Rate</div>
//             </motion.div>
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               whileInView={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               viewport={{ once: true }}
//               className="text-white"
//             >
//               <div className="text-4xl md:text-5xl font-bold mb-2">50%</div>
//               <div className="text-xl text-green-100">Yield Increase</div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default LandingPage;

// src/pages/LandingPage.jsx
// src/pages/LandingPage.jsx
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Sun, Droplets, Shield, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';


function LandingPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🆕 Translations
  const { t } = useTranslation({
    appName: 'Kissan',
    tagline: 'AI-Powered Farming Assistant for Every Farmer',
    description: 'Harness the power of artificial intelligence to optimize your farming operations, increase yields, and make data-driven decisions for a sustainable future.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    empoweringTitle: 'Empowering Farmers with Technology',
    empoweringDesc: 'Our comprehensive platform provides everything you need to modernize your farming practices',
    weatherTitle: 'Weather Insights',
    weatherDesc: 'Get accurate weather forecasts and cultivation recommendations for your crops.',
    irrigationTitle: 'Smart Irrigation',
    irrigationDesc: 'Optimize water usage with AI-powered irrigation scheduling and monitoring.',
    diseaseTitle: 'Disease Detection',
    diseaseDesc: 'Early detection of plant diseases using advanced image recognition technology.',
    marketTitle: 'Market Analytics',
    marketDesc: 'Real-time market prices and trends to maximize your farming profits.',
    activeFarmers: 'Active Farmers',
    accuracyRate: 'Accuracy Rate',
    yieldIncrease: 'Yield Increase',
  });

  const handleGetStarted = () => {
    navigate('/auth');
  };

  // 🔄 Features with translations
  const features = [
    {
      icon: Sun,
      title: t.weatherTitle || 'Weather Insights',
      description: t.weatherDesc || 'Get accurate weather forecasts...'
    },
    {
      icon: Droplets,
      title: t.irrigationTitle || 'Smart Irrigation',
      description: t.irrigationDesc || 'Optimize water usage...'
    },
    {
      icon: Shield,
      title: t.diseaseTitle || 'Disease Detection',
      description: t.diseaseDesc || 'Early detection of plant diseases...'
    },
    {
      icon: BarChart3,
      title: t.marketTitle || 'Market Analytics',
      description: t.marketDesc || 'Real-time market prices...'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">

      {/* 🎥 Background Video */}
      {/* <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src="/videos/farming.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/40"></div>
      </div> */}

      {/* 🌐 Floating Blobs Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-200/20 rounded-full blur-2xl"
        />
      </div>

      {/* 🚀 Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-2xl mb-8 mx-auto"
            >
              <Leaf className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
            >
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t.appName || 'Kissan'}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              {t.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            >
              {t.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link to="/home" onClick={handleGetStarted}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-green-600 hover:to-green-700"
                >
                  <span>{t.getStarted}</span>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-600 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-200 hover:border-green-300"
              >
                {t.learnMore}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 🌟 Features Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.empoweringTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.empoweringDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50"
              >  
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 📊 Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 py-20 bg-gradient-to-r from-green-500 to-blue-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl text-green-100">{t.activeFarmers}</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-xl text-green-100">{t.accuracyRate}</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">50%</div>
              <div className="text-xl text-green-100">{t.yieldIncrease}</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
