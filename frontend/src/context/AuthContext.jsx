import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in (on page load)
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('farmerToken');
      const farmerData = localStorage.getItem('farmerData');
      
      if (token && farmerData) {
        try {
          const parsedData = JSON.parse(farmerData);
          setUser(parsedData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing farmer data:', error);
          localStorage.removeItem('farmerToken');
          localStorage.removeItem('farmerData');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (token, farmerData) => {
    localStorage.setItem('farmerToken', token);
    localStorage.setItem('farmerData', JSON.stringify(farmerData));
    setUser(farmerData);
    setIsAuthenticated(true);
    
    // Redirect to home page after login
    navigate('/home');
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('farmerToken');
    localStorage.removeItem('farmerData');
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirect to landing page after logout
    navigate('/');
  };

  // Update user data (after profile edit)
  const updateUser = (updatedData) => {
    localStorage.setItem('farmerData', JSON.stringify(updatedData));
    setUser(updatedData);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};