import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      setMessage("✅ Logged in successfully!");
      console.log(res.data);

      navigate("/dashboard");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Something went wrong. Try again."
      );
      console.error(err);
    }
  };

  // 🔹 Handle Google login redirect
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  // 🔹 Handle LinkedIn login redirect
  const handleLinkedInLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/linkedin";
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-center items-center px-12">
        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg mb-6">
          Sign in to continue exploring our features and tools.
        </p>
        <div className="mt-12">
          <img
            src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
            alt="illustration"
            className="max-w-xs"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 bg-white flex justify-center items-center">
        <div className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold mb-6">Sign in to your account</h2>

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 rounded-lg py-2 mb-4 flex items-center justify-center bg-white hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* LinkedIn button */}
          <button
            onClick={handleLinkedInLogin}
            className="w-full border border-gray-300 rounded-lg py-2 mb-4 flex items-center justify-center bg-white hover:bg-gray-50"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="linkedin"
              className="w-5 h-5 mr-2"
            />
            Continue with LinkedIn
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-[#3B82F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-[#3B82F6] outline-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm text-gray-600">Remember me</label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-[#3B82F6] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-lg font-medium"
            >
              Sign In
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-red-600">{message}</p>
          )}

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#3B82F6] hover:underline">
              Create one →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
