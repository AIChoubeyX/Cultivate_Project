// src/components/FeatureCards.jsx
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, 
  Leaf, 
  MessageCircle, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import { useTranslation } from 'react-i18next'; // ⭐ Import i18n

/**
 * FeatureCards Component
 * Displays the four main features in separate containers
 * Each container has text on left and 3 animated cards in a box on right
 */
function FeatureCards() {
  const navigate = useNavigate();

  // ⭐ Use i18n hook with 'home' namespace (same as HomePage)
  const { t, i18n } = useTranslation('features');

  // ✅ WEATHER FEATURE - 3 CARDS DATA
  const weatherCards = [
    {
      id: 'weather-1',
      title: t('cards.weather.card1Title'),
      description: t('cards.weather.card1Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Weather forecast image)
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&q=80',
      bgColor: 'from-sky-400 to-blue-500'
    },
    {
      id: 'weather-2',
      title: t('cards.weather.card2Title'),
      description: t('cards.weather.card2Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Farming tips image)
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80',
      bgColor: 'from-cyan-400 to-sky-500'
    },
    {
      id: 'weather-3',
      title: t('cards.weather.card3Title'),
      description: t('cards.weather.card3Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Seasonal farming image)
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=80',
      bgColor: 'from-blue-400 to-indigo-500'
    }
  ];

  // ✅ DISEASE DETECTION FEATURE - 3 CARDS DATA
  const diseaseCards = [
    {
      id: 'disease-1',
      title: t('cards.disease.card1Title'),
      description: t('cards.disease.card1Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Plant disease scanning image)
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80',
      bgColor: 'from-green-400 to-emerald-500'
    },
    {
      id: 'disease-2',
      title: t('cards.disease.card2Title'),
      description: t('cards.disease.card2Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Treatment/medicine image)
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',
      bgColor: 'from-emerald-400 to-green-600'
    },
    {
      id: 'disease-3',
      title: t('cards.disease.card3Title'),
      description: t('cards.disease.card3Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Plant health image)
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80',
      bgColor: 'from-teal-400 to-emerald-500'
    }
  ];

  // ✅ CHATBOT FEATURE - 3 CARDS DATA
  const chatbotCards = [
    {
      id: 'chatbot-1',
      title: t('cards.chatbot.card1Title'),
      description: t('cards.chatbot.card1Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (AI chatbot/support image)
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&q=80',
      bgColor: 'from-purple-400 to-violet-500'
    },
    {
      id: 'chatbot-2',
      title: t('cards.chatbot.card2Title'),
      description: t('cards.chatbot.card2Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Expert consultation image)
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80',
      bgColor: 'from-violet-400 to-purple-600'
    },
    {
      id: 'chatbot-3',
      title: t('cards.chatbot.card3Title'),
      description: t('cards.chatbot.card3Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Communication/language image)
      image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500&q=80',
      bgColor: 'from-fuchsia-400 to-violet-500'
    }
  ];

  // ✅ MARKET PRICES FEATURE - 3 CARDS DATA
  const marketCards = [
    {
      id: 'market-1',
      title: t('cards.market.card1Title'),
      description: t('cards.market.card1Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Market/trading image)
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80',
      bgColor: 'from-orange-400 to-amber-500'
    },
    {
      id: 'market-2',
      title: t('cards.market.card2Title'),
      description: t('cards.market.card2Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Charts/graphs image)
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
      bgColor: 'from-amber-400 to-orange-600'
    },
    {
      id: 'market-3',
      title: t('cards.market.card3Title'),
      description: t('cards.market.card3Desc'),
      badge: t('cards.learnMore'),
      // 🎨 ADD YOUR IMAGE HERE (Market/mandi image)
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=500&q=80',
      bgColor: 'from-yellow-400 to-orange-500'
    }
  ];

  // ✅ ALL FEATURES CONFIGURATION
  const features = [
    {
      id: 'weather',
      title: t('features.weatherTitle'),
      description: t('features.weatherDesc'),
      icon: Cloud,
      color: 'from-sky-400 to-sky-600',
      bgLight: 'bg-sky-50',
      route: '/weather',
      cards: weatherCards
    },
    {
      id: 'disease',
      title: t('features.diseaseTitle'),
      description: t('features.diseaseDesc'),
      icon: Leaf,
      color: 'from-green-400 to-green-600',
      bgLight: 'bg-green-50',
      route: '/disease-detection',
      cards: diseaseCards
    },
    {
      id: 'chatbot',
      title: t('features.chatbotTitle'),
      description: t('features.chatbotDesc'),
      icon: MessageCircle,
      color: 'from-purple-400 to-purple-600',
      bgLight: 'bg-purple-50',
      route: '/chatbot',
      cards: chatbotCards
    },
    {
      id: 'market',
      title: t('features.marketTitle'),
      description: t('features.marketDesc'),
      icon: TrendingUp,
      color: 'from-orange-400 to-orange-600',
      bgLight: 'bg-orange-50',
      route: '/market-prices',
      cards: marketCards
    }
  ];

  // ✅ Navigation Handler
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* ✅ LEFT SIDE - Feature Info */}
            <div className="p-6 sm:p-8 lg:p-12 space-y-6 flex flex-col justify-center">
              {/* Icon */}
              <div className={`inline-flex w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl items-center justify-center shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
                {feature.title}
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Explore Button */}
              <button
                onClick={() => handleNavigate(feature.route)}
                className={`group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${feature.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold w-fit`}
              >
                <span>{t('features.exploreBtn')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    24/7
                  </div>
                  <div className="text-xs text-gray-600">{t('features.stats.available')}</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {t('features.stats.fast')}
                  </div>
                  <div className="text-xs text-gray-600">{t('features.stats.response')}</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {t('features.stats.free')}
                  </div>
                  <div className="text-xs text-gray-600">{t('features.stats.service')}</div>
                </div>
              </div>
            </div>

            {/* ✅ RIGHT SIDE - Cards Container (Inside the main box) ${feature.bgLight} */}
            <div className={` p-4 sm:p-8 lg:p-12 flex items-center justify-center relative overflow-hidden`}>
              <div className="w-full flex items-center justify-center" style={{ position: 'relative', minHeight: '280px', maxHeight: '400px' }}>
                <div className="relative flex items-center justify-center w-full" style={{ maxWidth: '380px', height: '280px' }}>
                  <CardSwap
                    cardDistance={40}
                    verticalDistance={50}
                    delay={5000}
                    pauseOnHover={true}
                    width={380}
                    height={280}
                  >
                  {feature.cards.map((card) => (
                    <Card 
                      key={card.id}
                      className="cursor-pointer overflow-hidden shadow-2xl"
                    >
                      {/* Card Content */}
                      <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                        {/* Image Section bg-gradient-to-br ${card.bgColor} opacity-80*/}
                        <div className="relative h-28 sm:h-32 overflow-hidden">
                          <div className={`absolute inset-0 `}></div>
                          <img 
                            src={card.image} 
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Text Content */}
                        <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
                          {/* Title */}
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-1">
                            {card.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2">
                            {card.description}
                          </p>

                          {/* Badge */}
                          <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r ${card.bgColor} text-white text-[10px] sm:text-xs font-semibold rounded-full`}>
                            {card.badge}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                                  </CardSwap>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeatureCards;