import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, Briefcase, Shield, Cog, LogOut, LayoutDashboard } from 'lucide-react';


const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const handleDashboard = () => {
    if (user.userType === 'agent') {
      navigate('/agent-dashboard');
    } else if (user.userType === 'admin') {
      navigate('/founder-dashboard');
    }
    setMenuOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}> 
            <Shield className="w-7 h-7 text-green-600 mr-2" />
            <span className="text-lg md:text-2xl font-bold text-gray-900">DigiAGIS</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-gray-700 hover:text-primary-600" onClick={() => navigate('/marketplace')}>Marketplace</button>
            <button className="text-gray-700 hover:text-primary-600" onClick={() => navigate('/verification')}>Verification</button>
            <button className="text-gray-700 hover:text-primary-600" onClick={() => navigate('/agents')}>Find Agents</button>
            <button className="text-gray-700 hover:text-primary-600" onClick={() => navigate('/how-it-works')}>How It Works</button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden md:flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {user.name} ({user.userType})
                </span>
                <button
                  className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center focus:outline-none border border-primary-200 ml-2"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Open user menu"
                >
                  <User className="w-5 h-5 text-primary-600" />
                </button>
                {/* Dropdown menu */}
                {menuOpen && (
                  <div className="absolute right-4 top-16 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                    {(user.userType === 'admin' || user.userType === 'agent' || user.userType === 'deal-initiator') && (
                      <button
                        onClick={() => {
                          if (user.userType === 'agent') {
                            navigate('/agent-dashboard');
                          } else if (user.userType === 'admin') {
                            navigate('/founder-dashboard');
                          } else if (user.userType === 'deal-initiator') {
                            navigate('/deal-initiator-dashboard');
                          }
                          setMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                      </button>
                    )}
                    <button onClick={() => {navigate('/profile'); setMenuOpen(false);}} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-2" /> Profile
                    </button>
                    <button onClick={() => {navigate('/settings'); setMenuOpen(false);}} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <Cog className="w-4 h-4 mr-2" /> Settings
                    </button>
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex gap-2">
                <button className="text-primary-600 font-semibold px-4 py-1 rounded hover:bg-primary-50" onClick={() => navigate('/login')}>Login</button>
                <button className="bg-primary-600 text-white font-semibold px-4 py-1 rounded hover:bg-primary-700" onClick={() => navigate('/signup')}>Sign Up</button>
              </div>
            )}
            {/* Mobile menu button */}
            <button className="md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-2 py-2">
            <button className="text-gray-700 py-2 px-4 text-left hover:bg-primary-50" onClick={() => {navigate('/marketplace'); setMenuOpen(false);}}>Marketplace</button>
            <button className="text-gray-700 py-2 px-4 text-left hover:bg-primary-50" onClick={() => {navigate('/verification'); setMenuOpen(false);}}>Verification</button>
            <button className="text-gray-700 py-2 px-4 text-left hover:bg-primary-50" onClick={() => {navigate('/agents'); setMenuOpen(false);}}>Find Agents</button>
            <button className="text-gray-700 py-2 px-4 text-left hover:bg-primary-50" onClick={() => {navigate('/how-it-works'); setMenuOpen(false);}}>How It Works</button>
            {!user && (
              <>
                <button className="text-primary-600 font-semibold px-4 py-2 text-left" onClick={() => {navigate('/login'); setMenuOpen(false);}}>Login</button>
                <button className="bg-primary-600 text-white font-semibold px-4 py-2 text-left rounded" onClick={() => {navigate('/signup'); setMenuOpen(false);}}>Sign Up</button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;