import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = ({ user, userName, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Post', href: '/feed' },
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
      setSearchTerm(''); // Optional: clear search bar after submit
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
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Functional Search Form */}
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`bg-gray-100 border rounded-full py-2 px-4 transition-all duration-300 ${isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
                />
                <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(!isSearchOpen)} 
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Search className="text-gray-500" size={22} />
                </button>
              </form>

              {/* Profile Section with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg"
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://i.pravatar.cc/150?u=${userName}`}
                    alt="User Avatar"
                  />
                  <div className="text-sm font-bold text-gray-700">{userName}</div>
                </button>

                {isProfileMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    onMouseLeave={() => setProfileMenuOpen(false)}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/profile/edit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <div className="border-t my-1"></div>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden ml-auto">
            {/* ... mobile menu button ... */}
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {/* ... mobile menu implementation ... */}
        </div>
      )}
    </header>
  );
};

export default Navbar;