export default function Signup() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-center items-center px-12">
        <h1 className="text-4xl font-bold mb-4">Join Us Today</h1>
        <p className="text-lg mb-6">
          Create an account and start exploring our features and tools.
        </p>

        {/* Placeholder for illustration */}
        <div className="mt-12">
          <img
            src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
            alt="illustration"
            className="max-w-xs"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 bg-white flex justify-center items-center">
        <div className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold mb-6">Create your account</h2>

          {/* Google button */}
          <button className="w-full border border-gray-300 rounded-lg py-2 mb-4 flex items-center justify-center bg-white hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>

          {/* LinkedIn button */}
          <button className="w-full border border-gray-300 rounded-lg py-2 mb-4 flex items-center justify-center bg-white hover:bg-gray-50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="linkedin"
              className="w-5 h-5 mr-2"
            />
            Sign up with LinkedIn
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-[#3B82F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-[#3B82F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-[#3B82F6] outline-none"
              />
            </div>

            <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-lg font-medium">
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#3B82F6] hover:underline">
              Sign in →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
