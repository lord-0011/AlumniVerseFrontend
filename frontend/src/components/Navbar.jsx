import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; // Import Link
import { Search } from 'lucide-react';

const Navbar = ({ user, userName, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Post', href: '/feed' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Events', href: '/events' },
    { name: 'Startups', href: '/startups' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ];

  const activeLinkStyle = {
    color: '#2563EB', // Tailwind's blue-600
    fontWeight: '600',
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
          <div className="hidden md:flex items-center space-x-6">
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
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`bg-gray-100 border rounded-full py-2 px-4 transition-all duration-300 ${isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
                />
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 rounded-full hover:bg-gray-100">
                  <Search className="text-gray-500" size={22} />
                </button>
              </div>
              <div className="text-sm text-gray-700">
                Welcome, <span className="font-bold">{userName || user.type}</span>
              </div>

              {/* WRAP THE IMG WITH A LINK */}
              <Link to="/profile">
                <img
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={user.type === 'alumni' ? 'https://i.pravatar.cc/150?u=rohan' : 'https://i.pravatar.cc/150?u=kavita'}
                  alt="User Avatar"
                />
              </Link>
              
              <button
                onClick={onLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500"
            >
              {/* ... mobile menu icon ... */}
            </button>
          </div>
        </div>
      </div>
      {/* ... mobile menu implementation ... */}
    </header>
  );
};

export default Navbar;