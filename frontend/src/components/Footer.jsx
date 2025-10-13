import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Tractor from '../assets/tractor.mp4'; // Placeholder for animated video

const Footer = () => {
  const { t } = useTranslation({
    // Social Proof Banner
    socialProof1: 'Ramesh earned ₹4.2L with smart crop recommendations',
    socialProof2: 'Priya saved her entire crop with AI disease detection',
    socialProof3: 'Harjeet gained ₹2.8L using market intelligence',
    socialProof4: 'Lakshmi increased yield to 42 quintals/acre',
    socialProof5: '10,000+ farmers trust our platform',
    
    // Footer Sections
    aboutTitle: 'About Kissan',
    aboutDesc: 'Empowering Indian farmers with AI-powered technology to increase yields, reduce costs, and build sustainable farming practices.',
    
    quickLinksTitle: 'Quick Links',
    features: 'Features',
    howItWorks: 'How It Works',
    pricing: 'Pricing',
    support: 'Support',
    blog: 'Blog',
    faqs: 'FAQs',
    
    resourcesTitle: 'Resources',
    cropGuide: 'Crop Guide',
    diseaseLibrary: 'Disease Library',
    marketPrices: 'Market Prices',
    weatherForecast: 'Weather Forecast',
    govSchemes: 'Government Schemes',
    
    contactTitle: 'Contact Us',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    addressText: 'India',
    
    followUs: 'Follow Us',
    newsletter: 'Subscribe to Newsletter',
    newsletterPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    
    copyright: '© 2025 Kissan. All rights reserved.',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    
    madeWith: 'Made with',
    forFarmers: 'for Indian Farmers'
  });

  const socialProofs = [
    t.socialProof1,
    t.socialProof2,
    t.socialProof3,
    t.socialProof4,
    t.socialProof5,
  ];

  const quickLinks = [
    { name: t.features, href: '#features' },
    { name: t.howItWorks, href: '#how-it-works' },
    { name: t.pricing, href: '#pricing' },
    { name: t.support, href: '#support' },
    { name: t.blog, href: '#blog' },
    { name: t.faqs, href: '#faqs' },
  ];

  const resources = [
    { name: t.cropGuide, href: '#crop-guide' },
    { name: t.diseaseLibrary, href: '#disease-library' },
    { name: t.marketPrices, href: '#market-prices' },
    { name: t.weatherForecast, href: '#weather' },
    { name: t.govSchemes, href: '#schemes' },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-green-50">
       
     
      
      {/* Video Section */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/30 to-green-100/30 z-10"></div>
        <video 
          src={Tractor} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Decorative overlay shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
      </div>
      

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              🌾 {t.aboutTitle}
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {t.aboutDesc}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-4">
              {t.quickLinksTitle}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-4">
              {t.resourcesTitle}
            </h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-4">
              {t.contactTitle}
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <Mail size={18} className="text-green-600" />
                <span className="text-sm">support@kissan.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone size={18} className="text-green-600" />
                <span className="text-sm">+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin size={18} className="text-green-600" />
                <span className="text-sm">{t.addressText}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-green-800 mb-2">
                {t.newsletter}
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t.newsletterPlaceholder}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors">
                  {t.subscribe}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 text-sm">
            {t.copyright}
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
              {t.terms}
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
              {t.privacy}
            </a>
          </div>
          <p className="text-gray-600 text-sm">
            {t.madeWith} <span className="text-red-500">❤️</span> {t.forFarmers}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;