// // src/components/FarmingFeatures.jsx

// import { motion } from "framer-motion";
// import { useTranslation } from '../hooks/useTranslation';
// import farmerImage1 from '../assets/farmer1.jpeg';
// import farmerImage2 from '../assets/farmer2.jpeg';
// import farmerImage3 from '../assets/farmer3.jpeg';
// import farmerImage4 from '../assets/farmer4.jpeg';

// const FarmingFeatures = () => {
//   const { t } = useTranslation({
//     // Main Section
//     mainTitle: 'Empowering Indian Farmers',
//     mainSubtitle: 'Real stories of farmers who transformed their livelihood with smart technology',
    
//     // Feature 1 - Crop Recommendation
//     feature1Title: 'Smart Crop Recommendation',
//     feature1Farmer: 'Ramesh Patil',
//     feature1Location: 'Nashik, Maharashtra',
//     feature1Story: 'For 30 years, Ramesh grew onions on his 4-acre farm. Erratic monsoons meant unpredictable harvests and losses. Our AI analyzed his soil and climate data, recommending pomegranates with chickpea intercropping instead.',
//     feature1Result: '₹4.2 lakhs from 2 acres',
//     feature1Impact: '—triple his previous income, with 40% less water usage. His son is now returning home to expand the business.',
    
//     // Feature 2 - Disease Detection
//     feature2Title: 'AI-Powered Disease Detection',
//     feature2Farmer: 'Priya Reddy',
//     feature2Location: 'Warangal, Telangana',
//     feature2Story: 'Priya lost ₹85,000 when disease spread across her chili farm before she could reach an agriculture officer. Next season, she spotted white spots on leaves at 7 AM, clicked a photo, and uploaded it.',
//     feature2Result: '30-second diagnosis: Powdery Mildew',
//     feature2Impact: 'The app suggested organic treatment in Telugu. She acted within 2 hours and saved her entire crop. Used it 7 times that season, achieving 98% healthy yield and saving ₹18,000 on pesticides.',
    
//     // Feature 3 - Market Analysis
//     feature3Title: 'Real-Time Market Intelligence',
//     feature3Farmer: 'Harjeet Singh',
//     feature3Location: 'Kolar, Karnataka',
//     feature3Story: 'At Kolar mandi, traders offered Harjeet ₹6/kg for his 35 quintal tomato harvest. He checked our app—it showed Malur APMC offering ₹10.50/kg. He drove 28 km and earned',
//     feature3Result: '₹1.57 lakhs extra in one trip',
//     feature3Impact: 'Now he plans harvests using price forecasts and discovered cherry tomatoes fetch 40% premium. Annual income increased by ₹2.8 lakhs.',
    
//     // Feature 4 - AI Assistant
//     feature4Title: '24/7 AI Farming Assistant',
//     feature4Farmer: 'Lakshmi Devi',
//     feature4Location: 'Araria, Bihar',
//     feature4Story: 'A widow managing 3 acres alone, Lakshmi struggled with farming decisions. Male officers rarely helped, and consultants charged ₹500-800 per visit. At 8 PM, she asked our AI in Hindi: "Dhan ke paudhe par bhure daag, kya karein?"',
//     feature4Result: '90-second diagnosis & treatment plan',
//     feature4Impact: 'That season, she consulted the AI 23 times—for pests, schemes, and more. Yield jumped to 42 quintals/acre (vs 35 district average). She saved ₹15,000 in consultation fees and gained confidence to farm independently.'
//   });

//   const fadeInUp = {
//     initial: { opacity: 0, y: 30 },
//     whileInView: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//     viewport: { once: true }
//   };

//   return (
//     <section className="px-6 md:px-16 py-20 bg-gradient-to-b from-green-50 to-emerald-50">
//       <motion.h2 
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         viewport={{ once: true }}
//         className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600"
//       >
//         {t.mainTitle}
//       </motion.h2>
//       <motion.p 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.7, delay: 0.2 }}
//         viewport={{ once: true }}
//         className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto font-medium"
//       >
//         {t.mainSubtitle}
//       </motion.p>

//       {/* Feature 1 - Smart Crop Recommendation */}
//       <motion.div 
//         {...fadeInUp}
//         className="flex flex-col md:flex-row items-center mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
//       >
//         <div className="md:w-1/2 md:pr-8">
//           <div className="inline-block mb-4">
//             {/* <span className="text-5xl">🌾</span> */}
//           </div>
//           <h3 className="text-3xl font-bold mb-3 text-green-800 tracking-tight">
//             {t.feature1Title}
//           </h3>
//           <div className="mb-4">
//             <span className="text-xl font-semibold text-green-700">{t.feature1Farmer}</span>
//             <span className="text-gray-500 text-sm ml-2">• {t.feature1Location}</span>
//           </div>
//           <p className="text-gray-700 leading-relaxed text-base mb-4">
//             {t.feature1Story}
//           </p>
//           <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
//             <p className="text-lg font-bold text-green-700 mb-1">💰 {t.feature1Result}</p>
//             <p className="text-gray-700 text-base">{t.feature1Impact}</p>
//           </div>
//         </div>
//         <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
//           <motion.img
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//             src={farmerImage1}
//             alt="Smart Crop Recommendation"
//             className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-80"
//           />
//         </div>
//       </motion.div>

//       {/* Feature 2 - Disease Detection */}
//       <motion.div 
//         {...fadeInUp}
//         className="flex flex-col md:flex-row-reverse items-center mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
//       >
//         <div className="md:w-1/2 md:pl-8">
//           <div className="inline-block mb-4">
//             {/* <span className="text-5xl">🔬</span> */}
//           </div>
//           <h3 className="text-3xl font-bold mb-3 text-green-800 tracking-tight">
//             {t.feature2Title}
//           </h3>
//           <div className="mb-4">
//             <span className="text-xl font-semibold text-green-700">{t.feature2Farmer}</span>
//             <span className="text-gray-500 text-sm ml-2">• {t.feature2Location}</span>
//           </div>
//           <p className="text-gray-700 leading-relaxed text-base mb-4">
//             {t.feature2Story}
//           </p>
//           <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
//             <p className="text-lg font-bold text-blue-700 mb-1">⚡ {t.feature2Result}</p>
//             <p className="text-gray-700 text-base">{t.feature2Impact}</p>
//           </div>
//         </div>
//         <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
//           <motion.img
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//             src={farmerImage2}
//             alt="AI-Powered Disease Detection"
//             className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-80"
//           />
//         </div>
//       </motion.div>

//       {/* Feature 3 - Market Analysis */}
//       <motion.div 
//         {...fadeInUp}
//         className="flex flex-col md:flex-row items-center mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
//       >
//         <div className="md:w-1/2 md:pr-8">
//           <div className="inline-block mb-4">
//             {/* <span className="text-5xl">📊</span> */}
//           </div>
//           <h3 className="text-3xl font-bold mb-3 text-green-800 tracking-tight">
//             {t.feature3Title}
//           </h3>
//           <div className="mb-4">
//             <span className="text-xl font-semibold text-green-700">{t.feature3Farmer}</span>
//             <span className="text-gray-500 text-sm ml-2">• {t.feature3Location}</span>
//           </div>
//           <p className="text-gray-700 leading-relaxed text-base mb-4">
//             {t.feature3Story} <span className="font-bold text-green-600 text-lg">{t.feature3Result}</span>.
//           </p>
//           <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
//             <p className="text-gray-700 text-base">{t.feature3Impact}</p>
//           </div>
//         </div>
//         <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
//           <motion.img
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//             src={farmerImage3}
//             alt="Real-Time Market Intelligence"
//             className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-80"
//           />
//         </div>
//       </motion.div>

//       {/* Feature 4 - AI Assistant */}
//       <motion.div 
//         {...fadeInUp}
//         className="flex flex-col md:flex-row-reverse items-center bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
//       >
//         <div className="md:w-1/2 md:pl-8">
//           <div className="inline-block mb-4">
//             {/* <span className="text-5xl">🧠</span> */}
//           </div>
//           <h3 className="text-3xl font-bold mb-3 text-green-800 tracking-tight">
//             {t.feature4Title}
//           </h3>
//           <div className="mb-4">
//             <span className="text-xl font-semibold text-green-700">{t.feature4Farmer}</span>
//             <span className="text-gray-500 text-sm ml-2">• {t.feature4Location}</span>
//           </div>
//           <p className="text-gray-700 leading-relaxed text-base mb-4">
//             {t.feature4Story}
//           </p>
//           <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
//             <p className="text-lg font-bold text-purple-700 mb-1">🤖 {t.feature4Result}</p>
//             <p className="text-gray-700 text-base">{t.feature4Impact}</p>
//           </div>
//         </div>
//         <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
//           <motion.img
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//             src={farmerImage4}
//             alt="AI Assistant for Expert Guidance"
//             className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-80"
//           />
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default FarmingFeatures;


// src/components/FarmingFeatures.jsx
// Features section with i18n support

import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // ⭐ Import from react-i18next
import farmerImage1 from '../assets/farmer1.jpeg';
import farmerImage2 from '../assets/farmer2.jpeg';
import farmerImage3 from '../assets/farmer3.jpeg';
import farmerImage4 from '../assets/farmer4.jpeg';

const FarmingFeatures = () => {
  // ⭐ Load translations from 'landing' namespace
  // This accesses locales/{lang}/landing.json > features section
  const { t } = useTranslation('landing');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  };

  return (
    <section className="px-6 md:px-16 py-20 bg-gradient-to-b from-green-50 to-emerald-50">
      
      {/* Section Header */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600"
      >
        {t('features.mainTitle')} {/* ⭐ Main title translation */}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto font-medium"
      >
        {t('features.mainSubtitle')} {/* ⭐ Subtitle translation */}
      </motion.p>

      {/* Feature 1 - Smart Crop Recommendation */}
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row items-center mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="md:w-1/2 md:pr-8">
          <h3 className="text-3xl font-bold mb-3 text-green-800 tracking-tight">
            {t('features.feature1.title')} {/* ⭐ Feature title */}
          </h3>
          
          <div className="mb-4">
            <span className="text-xl font-semibold text-green-700">
              {t('features.feature1.farmer')} {/* ⭐ Farmer name */}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              • {t('features.feature1.location')} {/* ⭐ Location */}
            </span>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            {t('features.feature1.story')} {/* ⭐ Story translation */}
          </p>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p className="text-lg font-bold text-green-700 mb-1">
              💰 {t('features.feature1.result')} {/* ⭐ Result */}
            </p>
            <p className="text-gray-700 text-base">
              {t('features.feature1.impact')} {/* ⭐ Impact */}
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={farmerImage1}
            alt={t('features.feature1.title')}
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-80"
          />
        </div>
      </motion.div>

      {/* Feature 2 - Disease Detection */}
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row-reverse items-center mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="md:w-1/2 md:pl-8">
          <h3 className="text-3xl font-bold mb-3 text-green-800 tracking-tight">
            {t('features.feature2.title')}
          </h3>
          
          <div className="mb-4">
            <span className="text-xl font-semibold text-green-700">
              {t('features.feature2.farmer')}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              • {t('features.feature2.location')}
            </span>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            {t('features.feature2.story')}
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-lg font-bold text-blue-700 mb-1">
              ⚡ {t('features.feature2.result')}
            </p>
            <p className="text-gray-700 text-base">
              {t('features.feature2.impact')}
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={farmerImage2}
            alt={t('features.feature2.title')}
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-80"
          />
        </div>
      </motion.div>

      {/* Feature 3 - Market Analysis */}
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row items-center mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="md:w-1/2 md:pr-8">
          <h3 className="text-3xl font-bold mb-3 text-green-800 tracking-tight">
            {t('features.feature3.title')}
          </h3>
          
          <div className="mb-4">
            <span className="text-xl font-semibold text-green-700">
              {t('features.feature3.farmer')}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              • {t('features.feature3.location')}
            </span>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            {t('features.feature3.story')}{' '}
            <span className="font-bold text-green-600 text-lg">
              {t('features.feature3.result')}
            </span>.
          </p>
          
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
            <p className="text-gray-700 text-base">
              {t('features.feature3.impact')}
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={farmerImage3}
            alt={t('features.feature3.title')}
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-80"
          />
        </div>
      </motion.div>

      {/* Feature 4 - AI Assistant */}
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row-reverse items-center bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="md:w-1/2 md:pl-8">
          <h3 className="text-3xl font-bold mb-3 text-green-800 tracking-tight">
            {t('features.feature4.title')}
          </h3>
          
          <div className="mb-4">
            <span className="text-xl font-semibold text-green-700">
              {t('features.feature4.farmer')}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              • {t('features.feature4.location')}
            </span>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            {t('features.feature4.story')}
          </p>
          
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
            <p className="text-lg font-bold text-purple-700 mb-1">
              🤖 {t('features.feature4.result')}
            </p>
            <p className="text-gray-700 text-base">
              {t('features.feature4.impact')}
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={farmerImage4}
            alt={t('features.feature4.title')}
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover h-80"
          />
        </div>
      </motion.div>
      
    </section>
  );
};

export default FarmingFeatures;