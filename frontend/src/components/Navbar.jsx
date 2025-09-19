import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation(); // Get current path

  // Simulated auth state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("Demo");
  const [profilePic, setProfilePic] = useState(
    "https://i.pravatar.cc/40" // Placeholder image
  );

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Premium", path: "/premium" },
    { name: "Webinars", path: "/webinars" },
    { name: "Referrals", path: "/referrals" },
    { name: "Donations", path: "/donations" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setProfilePic("");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#0F111A] border-b border-[#2A2F4B] shadow sticky top-0 z-50 w-full text-[#E2E8F0]">
      <div className="flex items-center h-16 relative w-full max-w-full px-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-[#3B82F6]">
            AlumniVerse
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-1 rounded font-medium ${
                isActive(item.path)
                  ? "bg-[#1A1F3B] text-[#3B82F6]" // active: dark bg with accent text
                  : "text-[#E2E8F0] hover:text-[#3B82F6]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: Auth/Profile */}
        <div className="hidden md:flex ml-auto space-x-4 items-center relative">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 rounded-lg font-medium bg-[#1A1F3B] text-[#E2E8F0] hover:bg-[#2A2F4B]">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 rounded-lg font-medium bg-[#1A1F3B] text-[#E2E8F0] hover:bg-[#2A2F4B]">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#1A1F3B] hover:bg-[#2A2F4B]"
              >
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{userName}</span>
                <ChevronDown size={16} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1A1F3B] border border-[#2A2F4B] shadow-lg rounded-md py-2 z-50">
                  <Link
                    to="/edit-profile"
                    className="block px-4 py-2 text-[#E2E8F0] hover:bg-[#2A2F4B]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-[#2A2F4B]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-auto p-2 rounded hover:bg-[#1A1F3B]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="md:hidden bg-[#0F111A] border-t border-[#2A2F4B] shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-3 rounded ${
                isActive(item.path)
                  ? "bg-[#1A1F3B] text-[#3B82F6]"
                  : "text-[#E2E8F0] hover:bg-[#1A1F3B] hover:text-[#3B82F6]"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-3 text-[#E2E8F0] hover:bg-[#1A1F3B] hover:text-[#3B82F6]"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-3 text-[#E2E8F0] hover:bg-[#1A1F3B] hover:text-[#3B82F6]"
                onClick={() => setOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center px-4 py-3 space-x-2">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{userName}</span>
              </div>
              <Link
                to="/edit-profile"
                className="block px-4 py-3 text-[#E2E8F0] hover:bg-[#1A1F3B] hover:text-[#3B82F6]"
                onClick={() => setOpen(false)}
              >
                Edit Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-[#1A1F3B]"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
