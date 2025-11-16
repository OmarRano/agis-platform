import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Verification from './pages/Verification';
import FounderDashboard from './components/dashboard/FounderDashboard';
import AgentDashboard from './components/dashboard/AgentDashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const theme = createTheme({
  palette: {
    primary: { main: '#2E7D32' },
    secondary: { main: '#FF6F00' },
  },
});

function ProtectedRoute({ children, requiredUserType }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  // If admin tries to access user pages, redirect to founder dashboard
  if (user.userType === 'admin' && requiredUserType !== 'admin') {
    return <Navigate to="/founder-dashboard" replace />;
  }
  
  // If agent tries to access admin pages, redirect to agent dashboard
  if (user.userType === 'agent' && requiredUserType === 'admin') {
    return <Navigate to="/agent-dashboard" replace />;
  }
  
  // Check if user has required permission
  if (requiredUserType && user.userType !== requiredUserType) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          {/* Header/Footer are rendered only when auth is available */}
          {user && <Header />}
          <main>
            <Routes>
              {/* Public */}
              <Route path="/login" element={user ? <Navigate to="/marketplace" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/marketplace" /> : <Signup />} />

              {/* Public pages */}
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/verification" element={<Verification />} />

              {/* Protected */}
              <Route
                path="/founder-dashboard"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <FounderDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agent-dashboard"
                element={
                  <ProtectedRoute requiredUserType="agent">
                    <AgentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          {user && <Footer />}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    // AuthProvider must wrap everything that calls useAuth
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}