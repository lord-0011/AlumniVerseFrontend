import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { BASE_URL } from "../api";

const AuthPage = ({ onLogin }) => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    const config = { headers: { 'Content-Type': 'application/json' } };

    if (isLoginView) {
      try {
        const body = { email, password, role };
        const res = await axios.post(`${BASE_URL}/auth/login`, body, config);
        
        // Ensure all items are set correctly
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.name);
        localStorage.setItem('userRole', res.data.role);
        localStorage.setItem('userId', res.data._id); // This line is essential

        onLogin(res.data.role, res.data.name);
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      }
    } else {
      try {
        const body = { name, email, password, role };
        const res = await axios.post(`${BASE_URL}/auth/register`, body, config);

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.name);
        localStorage.setItem('userRole', res.data.role);
        localStorage.setItem('userId', res.data._id);
        localStorage.setItem('userProfilePicture', res.data.profilePicture || ""); // ✅ store profile picture

        navigate(`/onboarding/${role}`);
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
      }
    }
  };

  const title = isLoginView ? 'Login' : 'Sign Up';
  const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">
          {roleDisplay} {title}
        </h1>
        {error && (
          <p className="text-center text-red-500 bg-red-100 p-2 rounded-md my-4">
            {error}
          </p>
        )}
        <form onSubmit={handleAuth}>
          <div className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="w-full mt-1 p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="w-full mt-1 p-3 border rounded-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            {title} <ArrowRight className="ml-2" size={20} />
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLoginView(!isLoginView);
              setError('');
            }}
            className="font-semibold text-blue-600 hover:underline ml-1"
          >
            {isLoginView ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
