import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: async (message, language = 'en', sessionId = 'default') => {
    const response = await api.post('/chat/message', {
      message,
      language,
      sessionId
    });
    return response.data;
  },

  clearChat: async (sessionId = 'default') => {
    const response = await api.post('/chat/clear', { sessionId });
    return response.data;
  },

  checkHealth: async () => {
    const response = await api.get('/chat/health');
    return response.data;
  }
};
// export const API_ENDPOINTS = {
//   DETECT_DISEASE: `${API_BASE_URL}/plant/detect`,
//   GET_HISTORY: `${API_BASE_URL}/plant/history`,
//   HEALTH_CHECK: `${API_BASE_URL}/health`
// };
export default api;