import React from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure this is imported

// CORRECT: The `onLogin` prop is removed from the function signature.
const LandingPage = () => {
  // We use the `useNavigate` hook to handle clicks.
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Welcome! 👋</h1>
        <p className="text-gray-600 mb-8">Connect. Mentor. Grow.</p>
        <div className="space-y-4">
          <button
            // CORRECT: onClick now navigates to the AuthPage for alumni.
            onClick={() => navigate('/auth/alumni')}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            I am an Alumni
          </button>
          <button
            // CORRECT: onClick now navigates to the AuthPage for students.
            onClick={() => navigate('/auth/student')}
            className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition"
          >
            I am a Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;