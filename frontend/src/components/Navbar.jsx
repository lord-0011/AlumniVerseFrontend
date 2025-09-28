import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Users, X } from 'lucide-react'; // Import X for close icon
import { getAlumniDashboardStats } from '../api';

const Navbar = ({ user, userName, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [connectionRequests, setConnectionRequests] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.type === 'alumni') {
      const fetchConnectionCount = async () => {
        try {
          const token = localStorage.getItem('token');
          const data = await getAlumniDashboardStats(token);
          setConnectionRequests(data.pendingConnections || 0);
        } catch (error) {
          console.error("Failed to fetch connection count for navbar", error);
        }
      };
      fetchConnectionCount();
    }
  }, [user]);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Posts', href: '/feed' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Events', href: '/events' },
    { name: 'Startups', href: '/startups' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ];

  const activeLinkStyle = {
    color: '#2563EB',
    fontWeight: '600',
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm('');
      setMobileMenuOpen(false); // Close mobile menu after search
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <NavLink to="/home" className="text-2xl font-bold text-blue-600 flex-shrink-0">
              AlumniVerse
            </NavLink>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {/* ... Desktop nav links ... */}
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.href} style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
                  {link.name}
                </NavLink>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* ... Desktop search, connections, and profile ... */}
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`bg-gray-100 border rounded-full py-2 px-4 transition-all duration-300 ${isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'}`} />
                <button type="button" onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 rounded-full hover:bg-gray-100">
                  <Search className="text-gray-500" size={22} />
                </button>
              </form>
              {user && user.type === 'alumni' && (
                <Link to="/connections" title="Connections" className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Users className="text-gray-500" size={22} />
                  {connectionRequests > 0 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">{connectionRequests}</div>
                  )}
                </Link>
              )}
              <div className="relative">
                <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg">
                  <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/150?u=${userName}`} alt="User Avatar" />
                  <div className="text-sm font-bold text-gray-700">{userName}</div>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50" onMouseLeave={() => setProfileMenuOpen(false)}>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileMenuOpen(false)}>View Profile</Link>
                    <Link to="/profile/edit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileMenuOpen(false)}>Edit Profile</Link>
                    <div className="border-t my-1"></div>
                    <button onClick={() => { setProfileMenuOpen(false); onLogout(); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center md:hidden ml-auto">
            {/* Hamburger Button */}
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} type="button" className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Implementation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="p-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-100 border rounded-full py-2 px-4 pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </form>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}
            {user && user.type === 'alumni' && (
              <NavLink to="/connections" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                Connections
              </NavLink>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/150?u=${userName}`} alt="User Avatar" />
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{userName}</div>
                <div className="text-sm font-medium text-gray-500 capitalize">{user.type}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>View Profile</Link>
              <Link to="/profile/edit" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Edit Profile</Link>
              <button onClick={() => { setMobileMenuOpen(false); onLogout(); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;