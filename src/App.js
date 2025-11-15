import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
    primary: {
      main: '#2E7D32', // Green theme for AGIS
    },
    secondary: {
      main: '#FF6F00', // Orange accent
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/founder-dashboard" element={<FounderDashboard />} />
              <Route path="/agent-dashboard" element={<AgentDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;