import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import Premium from "./components/Premium";
import Webinars from "./components/Webinars";
import Referrals from "./components/Referrals";
import Donations from "./components/Donations";
import Home from "./components/Home";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile";

function AppContent() {
  const location = useLocation();

  // Hide Navbar on these routes
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
