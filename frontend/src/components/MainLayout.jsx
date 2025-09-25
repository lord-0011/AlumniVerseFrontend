import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// 1. Accept `userName` as a prop here
const MainLayout = ({ user, userName, onLogout }) => {
  return (
    <div>
      {/* 2. Pass the `userName` prop down to the Navbar */}
      <Navbar user={user} userName={userName} onLogout={onLogout} />
      <main className="bg-gray-100 min-h-screen pt-20">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;