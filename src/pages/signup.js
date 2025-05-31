export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-900 p-6">
      {/* Glass morphism form */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md relative group hover:bg-white/15 transition-all duration-500">
        {/* Form glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
        
        <div className="relative space-y-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-blue-300 to-red-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
              Create Account
            </h2>
            <p className="text-blue-200 text-lg font-light">Join our community today</p>
          </div>
          
          {/* Full Name Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 bg-white/5 border-2 border-blue-400/30 rounded-2xl text-white placeholder-blue-200 focus:border-blue-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 hover:border-blue-300/50"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 bg-white/5 border-2 border-blue-400/30 rounded-2xl text-white placeholder-blue-200 focus:border-blue-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 hover:border-blue-300/50"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          
          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-white/5 border-2 border-blue-400/30 rounded-2xl text-white placeholder-blue-200 focus:border-blue-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 hover:border-blue-300/50"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          
          {/* Sign Up Button */}
          <button 
            type="submit"
            className="w-full relative group/btn overflow-hidden rounded-2xl p-1 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-red-500 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-blue-500 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-red-600 group-hover/btn:from-red-600 group-hover/btn:to-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg transition-all duration-500">
              <span className="relative z-10">Create Account</span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </div>
          </button>
          
          {/* Divider */}
          <div className="flex items-center space-x-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            <span className="text-blue-200 text-sm font-medium">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
          </div>
          
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-3 p-3 bg-white/5 border border-white/20 rounded-2xl text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300">
              <div className="w-5 h-5 bg-blue-500 rounded"></div>
              <span>Continue with Google</span>
            </button>
            
            <button className="w-full flex items-center justify-center space-x-3 p-3 bg-white/5 border border-white/20 rounded-2xl text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300">
              <div className="w-5 h-5 bg-red-500 rounded"></div>
              <span>Continue with GitHub</span>
            </button>
          </div>
          
          {/* Sign in link */}
          <p className="mt-6 text-center text-blue-200 text-sm">
            Already have an account?{' '}
            <a href="#" className="text-red-400 hover:text-red-300 font-semibold hover:underline transition-colors duration-200">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}