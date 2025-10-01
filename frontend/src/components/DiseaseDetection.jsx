import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  Scan, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Leaf,
  Eye,
  Download,
  Share,
  History,
  Zap,
  Shield,
  Target
} from 'lucide-react';

const diseaseDatabase = [
  {
    id: 1,
    name: 'Leaf Blight',
    crop: 'Rice',
    severity: 'High',
    confidence: 92,
    symptoms: ['Brown spots on leaves', 'Yellowing margins', 'Wilting'],
    treatment: [
      'Apply copper-based fungicide',
      'Improve field drainage',
      'Remove infected plants',
      'Use resistant varieties'
    ],
    prevention: [
      'Maintain proper spacing',
      'Avoid overhead irrigation',
      'Regular field inspection'
    ],
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg'
  },
  {
    id: 2,
    name: 'Powdery Mildew',
    crop: 'Wheat',
    severity: 'Medium',
    confidence: 88,
    symptoms: ['White powdery coating', 'Stunted growth', 'Reduced yield'],
    treatment: [
      'Apply sulfur-based fungicide',
      'Increase air circulation',
      'Remove affected leaves'
    ],
    prevention: [
      'Plant resistant varieties',
      'Avoid overcrowding',
      'Monitor humidity levels'
    ],
    image: 'https://images.pexels.com/photos/4750275/pexels-photo-4750275.jpeg'
  },
  {
    id: 3,
    name: 'Healthy Plant',
    crop: 'Tomato',
    severity: 'None',
    confidence: 95,
    symptoms: ['Green healthy leaves', 'Normal growth', 'No discoloration'],
    treatment: ['Continue current care routine'],
    prevention: [
      'Regular watering',
      'Balanced fertilization',
      'Pest monitoring'
    ],
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'
  }
];

const analysisHistory = [
  {
    id: 1,
    date: '2024-03-15',
    time: '10:30 AM',
    crop: 'Rice',
    result: 'Leaf Blight Detected',
    confidence: 92,
    severity: 'High',
    status: 'disease'
  },
  {
    id: 2,
    date: '2024-03-14',
    time: '2:15 PM',
    crop: 'Tomato',
    result: 'Healthy Plant',
    confidence: 95,
    severity: 'None',
    status: 'healthy'
  },
  {
    id: 3,
    date: '2024-03-13',
    time: '9:45 AM',
    crop: 'Wheat',
    result: 'Powdery Mildew',
    confidence: 88,
    severity: 'Medium',
    status: 'disease'
  }
];

function DiseaseDetection() {
  const [activeTab, setActiveTab] = useState('detect');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomResult = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'none': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'disease': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <XCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Crop Disease Detection</h1>
          <p className="text-xl text-gray-600">AI-powered plant disease identification and treatment recommendations</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {['detect', 'history', 'database'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Disease Detection Tab */}
        {activeTab === 'detect' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Upload Section */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Plant Image</h3>
              
              <div
                className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                  dragOver 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected plant" 
                      className="max-w-md max-h-64 mx-auto rounded-2xl shadow-lg object-cover"
                    />
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                      >
                        Change Image
                      </button>
                      <button
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <Scan className="w-5 h-5" />
                            <span>Analyze Image</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Upload className="w-24 h-24 mx-auto text-gray-400" />
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        Drop your plant image here
                      </h4>
                      <p className="text-gray-600 mb-6">
                        or click to browse from your device
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Upload Image</span>
                      </button>
                      <button className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                        <Camera className="w-5 h-5" />
                        <span>Take Photo</span>
                      </button>
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Analysis Result */}
            <AnimatePresence>
              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Analysis Result</h3>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                        <Share className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Result Summary */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{analysisResult.name}</h4>
                          <p className="text-gray-600">Detected in {analysisResult.crop}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">{analysisResult.confidence}%</div>
                          <div className="text-sm text-gray-600">Confidence</div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-2xl border ${getSeverityColor(analysisResult.severity)}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-5 h-5" />
                          <span className="font-semibold">Severity Level</span>
                        </div>
                        <p className="text-lg font-bold">{analysisResult.severity}</p>
                      </div>

                      {/* Symptoms */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3">Observed Symptoms</h5>
                        <div className="space-y-2">
                          {analysisResult.symptoms.map((symptom, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-gray-700">{symptom}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Treatment & Prevention */}
                    <div className="space-y-6">
                      {/* Treatment */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                          <Zap className="w-5 h-5 text-orange-600" />
                          <span>Recommended Treatment</span>
                        </h5>
                        <div className="space-y-2">
                          {analysisResult.treatment.map((treatment, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-xl">
                              <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                {index + 1}
                              </div>
                              <span className="text-gray-700">{treatment}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prevention */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          <span>Prevention Tips</span>
                        </h5>
                        <div className="space-y-2">
                          {analysisResult.prevention.map((tip, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <span className="text-gray-700">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Analysis History Tab */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Analysis History</h3>
            <div className="space-y-4">
              {analysisHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(item.status)}
                    <div>
                      <div className="font-semibold text-gray-800">{item.result}</div>
                      <div className="text-sm text-gray-600">{item.crop} • {item.date} at {item.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{item.confidence}%</div>
                    <div className={`text-sm px-2 py-1 rounded-lg ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Disease Database Tab */}
        {activeTab === 'database' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Disease Database</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diseaseDatabase.map((disease, index) => (
                  <motion.div
                    key={disease.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <img 
                      src={disease.image} 
                      alt={disease.name}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{disease.name}</h4>
                        <p className="text-sm text-gray-600">Affects {disease.crop}</p>
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-lg text-sm ${getSeverityColor(disease.severity)}`}>
                        {disease.severity} Severity
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Symptoms:</strong> {disease.symptoms.slice(0, 2).join(', ')}
                        {disease.symptoms.length > 2 && '...'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default DiseaseDetection;