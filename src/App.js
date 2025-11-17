import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Skeleton fallback for Suspense
import LoadingSkeleton from './components/common/LoadingSkeleton';

// Lazy-loaded Components / Pages (named chunks for clearer splitting)
const Header = lazy(() => import(/* webpackChunkName: "Header" */ './components/common/Header'));
const Footer = lazy(() => import(/* webpackChunkName: "Footer" */ './components/common/Footer'));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const Marketplace = lazy(() => import(/* webpackChunkName: "Marketplace" */ './pages/Marketplace'));
const Verification = lazy(() => import(/* webpackChunkName: "Verification" */ './pages/Verification'));
const FounderDashboard = lazy(() => import(/* webpackChunkName: "FounderDashboard" */ './components/dashboard/FounderDashboard'));
const AgentDashboard = lazy(() => import(/* webpackChunkName: "AgentDashboard" */ './components/dashboard/AgentDashboard'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './components/auth/Login'));
const Signup = lazy(() => import(/* webpackChunkName: "Signup" */ './components/auth/Signup'));


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
            {user && (
              <Suspense fallback={<LoadingSkeleton type="header" />}>
                <Header />
              </Suspense>
            )}
            <main>
              <Routes>
              {/* Public */}
              <Route
                path="/login"
                element={
                  user ? (
                    <Navigate to="/marketplace" />
                  ) : (
                    <Suspense fallback={<LoadingSkeleton type="page" />}>
                      <Login />
                    </Suspense>
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  user ? (
                    <Navigate to="/marketplace" />
                  ) : (
                    <Suspense fallback={<LoadingSkeleton type="page" />}>
                      <Signup />
                    </Suspense>
                  )
                }
              />

              {/* Public pages */}
              <Route
                path="/"
                element={
                  <Suspense fallback={<LoadingSkeleton type="page" />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <Suspense fallback={<LoadingSkeleton type="page" />}>
                    <Marketplace />
                  </Suspense>
                }
              />
              <Route
                path="/verification"
                element={
                  <Suspense fallback={<LoadingSkeleton type="page" />}>
                    <Verification />
                  </Suspense>
                }
              />

              {/* Protected */}
              <Route
                path="/founder-dashboard"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <Suspense fallback={<LoadingSkeleton type="page" />}>
                      <FounderDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agent-dashboard"
                element={
                  <ProtectedRoute requiredUserType="agent">
                    <Suspense fallback={<LoadingSkeleton type="page" />}>
                      <AgentDashboard />
                    </Suspense>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
            {user && (
              <Suspense fallback={<LoadingSkeleton type="footer" />}>
                <Footer />
              </Suspense>
            )}
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