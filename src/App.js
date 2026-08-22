import DealInitiatorDashboard from './components/dashboard/DealInitiatorDashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import ProfileDashboard from './components/dashboard/ProfileDashboard';
import SettingsPage from './components/dashboard/SettingsPage';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SuperAdminDashboard from './components/dashboard/SuperAdminDashboard';
import BuyerDashboard from './components/dashboard/BuyerDashboard';

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
const AgentProfile = lazy(() => import(/* webpackChunkName: "AgentProfile" */ './pages/AgentProfile'));
const Analytics = lazy(() => import(/* webpackChunkName: "Analytics" */ './pages/Analytics'));
const FinanceDashboard = lazy(() => import(/* webpackChunkName: "FinanceDashboard" */ './components/dashboard/FinanceDashboard'));
const FounderDashboard = lazy(() => import(/* webpackChunkName: "FounderDashboard" */ './components/dashboard/FounderDashboard'));
const AgentDashboard = lazy(() => import(/* webpackChunkName: "AgentDashboard" */ './components/dashboard/AgentDashboard'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './components/auth/Login'));
const Signup = lazy(() => import(/* webpackChunkName: "Signup" */ './components/auth/Signup'));


const theme = createTheme({
  palette: {
    primary: { main: '#1a365d' },
    secondary: { main: '#c9a227' },
  },
});

function ProtectedRoute({ children, requiredUserType }) {
  const { user, loading } = useAuth();
  const requiredRoles = Array.isArray(requiredUserType) ? requiredUserType : [requiredUserType];

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  // If admin tries to access user pages, redirect to founder dashboard
  if ((user.userType === 'admin' || user.userType === 'super-admin') && !requiredRoles.includes(user.userType)) {
    return <Navigate to={user.userType === 'super-admin' ? '/super-admin' : '/admin'} replace />;
  }
  
  // If agent tries to access admin pages, redirect to agent dashboard
  if (user.userType === 'agent' && requiredRoles.some((role) => role === 'admin' || role === 'super-admin')) {
    return <Navigate to="/agent-dashboard" replace />;
  }
  
  // Check if user has required permission
  if (requiredUserType && !requiredRoles.includes(user.userType)) {
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
        {user && (
          <Suspense fallback={<LoadingSkeleton type="header" />}> 
            <Header />
          </Suspense>
        )}
        <main>
          <Routes>
            {/* New dashboard/auth routes */}
            <Route path="/deal-initiator-dashboard" element={<ProtectedRoute requiredUserType="deal-initiator"><DealInitiatorDashboard /></ProtectedRoute>} />
            <Route path="/deal-initiator" element={<ProtectedRoute requiredUserType="deal-initiator"><DealInitiatorDashboard /></ProtectedRoute>} />
            <Route path="/super-admin" element={<ProtectedRoute requiredUserType="super-admin"><SuperAdminDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requiredUserType="admin"><FounderDashboard /></ProtectedRoute>} />
            <Route path="/buyer-dashboard" element={<ProtectedRoute requiredUserType="buyer"><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/finance" element={<ProtectedRoute requiredUserType="admin"><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute requiredUserType={['super-admin', 'admin']}><Suspense fallback={<LoadingSkeleton type="page" />}><Analytics /></Suspense></ProtectedRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<ProfileDashboard />} />
            <Route path="/settings" element={<SettingsPage />} />

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
            <Route
              path="/agents"
              element={
                <Suspense fallback={<LoadingSkeleton type="page" />}>
                  <AgentProfile />
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