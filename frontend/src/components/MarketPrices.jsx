import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Calendar,
  MapPin,
  Filter,
  Search,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  Bell,
  Star,
  Download,
  Share
} from 'lucide-react';

const marketData = [
  {
    id: 1,
    crop: 'Rice',
    variety: 'Basmati',
    currentPrice: 2850,
    previousPrice: 2700,
    change: 5.6,
    trend: 'up',
    unit: 'per quintal',
    market: 'Delhi',
    lastUpdated: '2 hours ago',
    volume: '1,250 tons',
    quality: 'Grade A',
    forecast: 'bullish'
  },
  {
    id: 2,
    crop: 'Wheat',
    variety: 'Durum',
    currentPrice: 2120,
    previousPrice: 2165,
    change: -2.1,
    trend: 'down',
    unit: 'per quintal',
    market: 'Punjab',
    lastUpdated: '1 hour ago',
    volume: '2,100 tons',
    quality: 'Grade B',
    forecast: 'bearish'
  },
  {
    id: 3,
    crop: 'Cotton',
    variety: 'Long Staple',
    currentPrice: 5640,
    previousPrice: 5190,
    change: 8.7,
    trend: 'up',
    unit: 'per quintal',
    market: 'Gujarat',
    lastUpdated: '30 minutes ago',
    volume: '850 tons',
    quality: 'Premium',
    forecast: 'bullish'
  },
  {
    id: 4,
    crop: 'Sugarcane',
    variety: 'Co-86032',
    currentPrice: 320,
    previousPrice: 315,
    change: 1.6,
    trend: 'up',
    unit: 'per ton',
    market: 'Maharashtra',
    lastUpdated: '45 minutes ago',
    volume: '5,200 tons',
    quality: 'Standard',
    forecast: 'stable'
  },
  {
    id: 5,
    crop: 'Maize',
    variety: 'Yellow Corn',
    currentPrice: 1890,
    previousPrice: 1920,
    change: -1.6,
    trend: 'down',
    unit: 'per quintal',
    market: 'Karnataka',
    lastUpdated: '1.5 hours ago',
    volume: '1,800 tons',
    quality: 'Grade A',
    forecast: 'stable'
  },
  {
    id: 6,
    crop: 'Soybean',
    variety: 'JS-335',
    currentPrice: 4250,
    previousPrice: 4180,
    change: 1.7,
    trend: 'up',
    unit: 'per quintal',
    market: 'Madhya Pradesh',
    lastUpdated: '20 minutes ago',
    volume: '950 tons',
    quality: 'Premium',
    forecast: 'bullish'
  }
];

const priceHistory = [
  { date: '2024-03-10', rice: 2700, wheat: 2200, cotton: 5200 },
  { date: '2024-03-11', rice: 2750, wheat: 2180, cotton: 5300 },
  { date: '2024-03-12', rice: 2780, wheat: 2165, cotton: 5450 },
  { date: '2024-03-13', rice: 2820, wheat: 2150, cotton: 5500 },
  { date: '2024-03-14', rice: 2840, wheat: 2140, cotton: 5600 },
  { date: '2024-03-15', rice: 2850, wheat: 2120, cotton: 5640 }
];

const topGainers = [
  { crop: 'Cotton', change: 8.7, price: 5640 },
  { crop: 'Rice', change: 5.6, price: 2850 },
  { crop: 'Soybean', change: 1.7, price: 4250 }
];

const topLosers = [
  { crop: 'Wheat', change: -2.1, price: 2120 },
  { crop: 'Maize', change: -1.6, price: 1890 }
];

function MarketPrices() {
  const [activeTab, setActiveTab] = useState('prices');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [sortBy, setSortBy] = useState('change');
  const [watchlist, setWatchlist] = useState([1, 3]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const markets = ['all', 'Delhi', 'Punjab', 'Gujarat', 'Maharashtra', 'Karnataka', 'Madhya Pradesh'];

  const filteredData = marketData
    .filter(item => 
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedMarket === 'all' || item.market === selectedMarket)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'change':
          return Math.abs(b.change) - Math.abs(a.change);
        case 'price':
          return b.currentPrice - a.currentPrice;
        case 'crop':
          return a.crop.localeCompare(b.crop);
        default:
          return 0;
      }
    });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const toggleWatchlist = (id) => {
    setWatchlist(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getTrendIcon = (trend, change) => {
    if (Math.abs(change) < 1) return <Minus className="w-4 h-4 text-gray-500" />;
    return trend === 'up' 
      ? <ArrowUp className="w-4 h-4 text-green-600" />
      : <ArrowDown className="w-4 h-4 text-red-600" />;
  };

  const getTrendColor = (change) => {
    if (Math.abs(change) < 1) return 'text-gray-600';
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getForecastColor = (forecast) => {
    switch (forecast) {
      case 'bullish': return 'text-green-600 bg-green-50 border-green-200';
      case 'bearish': return 'text-red-600 bg-red-50 border-red-200';
      case 'stable': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Market Price Updates</h1>
          <p className="text-xl text-gray-600">Real-time commodity prices and market trends</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {['prices', 'trends', 'watchlist'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Market Prices Tab */}
        {activeTab === 'prices' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Controls */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search crops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Market Filter */}
                  <select
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {markets.map(market => (
                      <option key={market} value={market}>
                        {market === 'all' ? 'All Markets' : market}
                      </option>
                    ))}
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="change">Sort by Change</option>
                    <option value="price">Sort by Price</option>
                    <option value="crop">Sort by Crop</option>
                  </select>
                </div>

                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{item.crop}</h3>
                      <p className="text-gray-600">{item.variety}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleWatchlist(item.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          watchlist.includes(item.id)
                            ? 'text-yellow-500 bg-yellow-50'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${watchlist.includes(item.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Bell className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-gray-800">₹{item.currentPrice.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{item.unit}</div>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 ${getTrendColor(item.change)}`}>
                          {getTrendIcon(item.trend, item.change)}
                          <span className="font-semibold">{Math.abs(item.change)}%</span>
                        </div>
                        <div className="text-sm text-gray-500">vs yesterday</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Market</div>
                        <div className="font-semibold flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.market}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Volume</div>
                        <div className="font-semibold">{item.volume}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Quality</div>
                        <div className="font-semibold">{item.quality}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Updated</div>
                        <div className="font-semibold">{item.lastUpdated}</div>
                      </div>
                    </div>

                    <div className={`px-3 py-2 rounded-xl border text-sm font-semibold ${getForecastColor(item.forecast)}`}>
                      Forecast: {item.forecast.charAt(0).toUpperCase() + item.forecast.slice(1)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Market Trends Tab */}
        {activeTab === 'trends' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Top Gainers & Losers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Gainers */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <span>Top Gainers</span>
                </h3>
                <div className="space-y-3">
                  {topGainers.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-800">{item.crop}</div>
                        <div className="text-sm text-gray-600">₹{item.price.toLocaleString()}</div>
                      </div>
                      <div className="text-green-600 font-bold">+{item.change}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Losers */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                  <span>Top Losers</span>
                </h3>
                <div className="space-y-3">
                  {topLosers.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-800">{item.crop}</div>
                        <div className="text-sm text-gray-600">₹{item.price.toLocaleString()}</div>
                      </div>
                      <div className="text-red-600 font-bold">{item.change}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price History Chart Placeholder */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-orange-600" />
                <span>Price Trends (Last 7 Days)</span>
              </h3>
              <div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Interactive price chart would be displayed here</p>
                  <p className="text-sm">Showing trends for Rice, Wheat, and Cotton</p>
                </div>
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Market Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-2xl">
                  <div className="text-2xl font-bold text-blue-600 mb-2">+3.2%</div>
                  <div className="text-gray-600">Overall Market</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600 mb-2">₹2.8L Cr</div>
                  <div className="text-gray-600">Total Volume</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-2xl">
                  <div className="text-2xl font-bold text-orange-600 mb-2">15</div>
                  <div className="text-gray-600">Active Markets</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Watchlist Tab */}
        {activeTab === 'watchlist' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">My Watchlist</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {watchlist.length > 0 ? (
                <div className="space-y-4">
                  {marketData
                    .filter(item => watchlist.includes(item.id))
                    .map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <div>
                            <div className="font-semibold text-gray-800">{item.crop}</div>
                            <div className="text-sm text-gray-600">{item.variety} • {item.market}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-800">₹{item.currentPrice.toLocaleString()}</div>
                          <div className={`text-sm flex items-center space-x-1 ${getTrendColor(item.change)}`}>
                            {getTrendIcon(item.trend, item.change)}
                            <span>{Math.abs(item.change)}%</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">No items in watchlist</h4>
                  <p className="text-gray-600 mb-6">Add crops to your watchlist to track their prices</p>
                  <button
                    onClick={() => setActiveTab('prices')}
                    className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                  >
                    Browse Prices
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MarketPrices;