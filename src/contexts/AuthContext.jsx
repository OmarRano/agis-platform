import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const STORAGE_KEY = 'sorella_user';
const DEMO_ACCOUNTS = {
  'superadmin@sorella.demo': { id: 1, name: 'Sorella Super Admin', userType: 'super-admin', isVerified: true, permissions: ['all'] },
  'admin@sorella.demo': { id: 2, name: 'Sorella Admin', userType: 'admin', isVerified: true, permissions: ['manage-agents', 'manage-listings'] },
  'deals@sorella.demo': { id: 3, name: 'Certified Deal Initiator', userType: 'deal-initiator', isVerified: true, tier: 'GOLD' },
  'agent@sorella.demo': { id: 4, name: 'Certified Sorella Agent', userType: 'agent', isVerified: true, trustScore: 95, sorellaId: 'SRE-001' },
  'buyer@sorella.demo': { id: 5, name: 'Demo Buyer', userType: 'buyer', isVerified: true },
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const normalizedEmail = email.trim().toLowerCase();
      const demoAccount = DEMO_ACCOUNTS[normalizedEmail];
      if (demoAccount && password !== 'demo123') {
        return { success: false, error: 'Invalid email or password' };
      }
      let userData = demoAccount ? { ...demoAccount } : {};

      // Admin detection
      if (!demoAccount && (normalizedEmail === 'umar.admin@demo.com' || normalizedEmail.includes('@digiagis.admin') || normalizedEmail.includes('admin@digiagis'))) {
        userData = {
          id: 1,
          email: normalizedEmail,
          name: 'Platform Administrator',
          userType: 'admin',
          avatar: '/api/placeholder/40/40',
          isVerified: true,
          permissions: ['all'],
          joinDate: '2024-01-01'
        };
      }
      // Deal Initiator detection - official deal initiator emails
      else if (!demoAccount && (normalizedEmail.includes('@digiagis.dealinitiator') || normalizedEmail.includes('dealinitiator@digiagis'))) {
        userData = {
          id: 4,
          email: normalizedEmail,
          name: 'Certified Deal Initiator',
          userType: 'deal-initiator',
          avatar: '/api/placeholder/40/40',
          isVerified: true,
          tier: 'GOLD',
          joinDate: '2024-01-01'
        };
      }
      // Agent detection - official agent emails
      else if (!demoAccount && (normalizedEmail.includes('@digiagis.agent') || normalizedEmail.includes('agent@digiagis') || (normalizedEmail.includes('@digiagis') && !normalizedEmail.includes('admin') && !normalizedEmail.includes('dealinitiator')))) {
        userData = {
          id: 2,
          email: normalizedEmail,
          name: 'Certified Agent',
          userType: 'agent',
          avatar: '/api/placeholder/40/40',
          isVerified: true,
          trustScore: 95,
          agisId: 'ABJ-AGIS-2024',
          joinDate: '2024-01-01'
        };
      }
      // Buyer/Seller - normal email addresses
      else {
        const namePrefix = normalizedEmail.split('@')[0];
        userData = {
          id: 3,
          email: normalizedEmail,
          name: namePrefix.includes('buyer') ? 'Demo Buyer' : namePrefix.includes('seller') ? 'Demo Seller' : 'Demo User',
          userType: 'user',
          avatar: '/api/placeholder/40/40',
          isVerified: false,
          joinDate: '2024-01-01'
        };
      }

      setUser(userData);
      userData.email = userData.email || normalizedEmail;
      userData.joinDate = userData.joinDate || '2024-01-01';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For agents, check if email is official
      if (userData.userType === 'agent') {
          if (!userData.email.includes('@sorella')) {
          return { 
            success: false, 
            error: 'Agents must use official Sorella email addresses provided by the platform administrator.'
          };
        }
      }
      // For deal-initiators, check if email is official
      if (userData.userType === 'deal-initiator') {
        if (!userData.email.includes('@sorella')) {
          return {
            success: false,
            error: 'Deal Initiators must use official Sorella email addresses provided by the platform administrator.'
          };
        }
      }

      const newUser = {
        id: Math.random(),
        ...userData,
        isVerified: userData.userType === 'agent' ? false : true, // Agents need verification
        trustScore: userData.userType === 'agent' ? 0 : null,
        tier: userData.userType === 'deal-initiator' ? 'GOLD' : null,
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};