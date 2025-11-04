// src/components/Links.jsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ExternalLink, 
  ChevronDown,
  GraduationCap,
  Briefcase,
  Search,
  Tractor,
  Cpu,
  School,
  Sprout,
  Leaf,
  Apple,
  Bug,
  TrendingUp,
  DollarSign,
  BookOpen,
  ShoppingBag,
  Building2,
  Store
} from 'lucide-react';
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from './ui/disclosure';

/**
 * Links Component
 * Displays agricultural resource links with Disclosure components
 * Supports multi-language translation
 */
function Links() {
  const { t } = useTranslation('links');

  // ✅ Agricultural links data with appropriate icons
  const linksData = [
    {
      id: 1,
      titleKey: 'educationConsulting.title',
      descKey: 'educationConsulting.desc',
      url: 'https://ageduconsultants.com/',
      icon: GraduationCap
    },
    {
      id: 2,
      titleKey: 'recruitment.title',
      descKey: 'recruitment.desc',
      url: 'https://agrirecruiters.com/',
      icon: Briefcase
    },
    {
      id: 3,
      titleKey: 'jobs.title',
      descKey: 'jobs.desc',
      url: 'http://www.indiaagrijobs.com/',
      icon: Search
    },
    {
      id: 4,
      titleKey: 'tractorNews.title',
      descKey: 'tractorNews.desc',
      url: 'http://tractorbuyersguide.in/',
      icon: Tractor
    },
    {
      id: 5,
      titleKey: 'agTech.title',
      descKey: 'agTech.desc',
      url: 'http://agtechnews.com/',
      icon: Cpu
    },
    {
      id: 6,
      titleKey: 'colleges.title',
      descKey: 'colleges.desc',
      url: 'https://www.agricollegenews.com/',
      icon: School
    },
    {
      id: 7,
      titleKey: 'seedIndustry.title',
      descKey: 'seedIndustry.desc',
      url: 'https://seedindustrynews.com/',
      icon: Sprout
    },
    {
      id: 8,
      titleKey: 'sustainable.title',
      descKey: 'sustainable.desc',
      url: 'https://sustainableagnews.com/',
      icon: Leaf
    },
    {
      id: 9,
      titleKey: 'tomatoCultivation.title',
      descKey: 'tomatoCultivation.desc',
      url: 'https://tomatocultivation.com/',
      icon: Apple
    },
    {
      id: 10,
      titleKey: 'plantPathology.title',
      descKey: 'plantPathology.desc',
      url: 'https://plantpathologynews.com/',
      icon: Bug
    },
    {
      id: 11,
      titleKey: 'marketingNews.title',
      descKey: 'marketingNews.desc',
      url: 'https://agrimarketingnews.com/',
      icon: TrendingUp
    },
    {
      id: 12,
      titleKey: 'marketPrices.title',
      descKey: 'marketPrices.desc',
      url: 'https://agrimarketprices.com/',
      icon: DollarSign
    },
    {
      id: 13,
      titleKey: 'mbaAgriculture.title',
      descKey: 'mbaAgriculture.desc',
      url: 'https://agmba.com/',
      icon: BookOpen
    },
    {
      id: 14,
      titleKey: 'marketingJobs.title',
      descKey: 'marketingJobs.desc',
      url: 'https://agrimarketingjobs.com/',
      icon: ShoppingBag
    },
    {
      id: 15,
      titleKey: 'bankingJobs.title',
      descKey: 'bankingJobs.desc',
      url: 'https://www.agribankingjobs.com/',
      icon: Building2
    },
    {
      id: 16,
      titleKey: 'retailers.title',
      descKey: 'retailers.desc',
      url: 'http://agriretailers.com/',
      icon: Store
    }
  ];

  // ✅ Handle external link click
  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ✅ SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-4">
            {t('heading')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-green-700 max-w-3xl mx-auto">
            {t('subheading')}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-700 rounded-full"></div>
          </div>
        </motion.div>

        {/* ✅ DISCLOSURE LINKS GRID - Agricultural Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {linksData.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Disclosure
                  className="rounded-xl border-2 border-green-200 bg-white shadow-sm hover:bg-green-50 hover:border-green-400 hover:shadow-md transition-all duration-300"
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <DisclosureTrigger>
                    <div className="w-full px-4 py-3 flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 text-left line-clamp-2 group-hover:text-green-700 transition-colors">
                          {t(link.titleKey)}
                        </h3>
                      </div>
                      <ChevronDown className="w-5 h-5 text-green-600 flex-shrink-0 ml-2 transition-transform group-hover:translate-y-0.5" />
                    </div>
                  </DisclosureTrigger>
                  
                  <DisclosureContent>
                    <div className="px-4 pb-4 bg-green-50 border-t border-green-200">
                      <p className="text-xs text-gray-700 leading-relaxed pt-3 pb-3">
                        {t(link.descKey)}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick(link.url);
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 hover:shadow-md transition-all"
                      >
                        <span>{t('visitWebsite')}</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </DisclosureContent>
                </Disclosure>
              </motion.div>
            );
          })}
        </div>

        {/* ✅ FOOTER NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            {t('footerNote')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Links;
