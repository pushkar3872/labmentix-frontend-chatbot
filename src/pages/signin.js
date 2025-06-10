import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Sparkles, Check, AlertCircle, Loader2, LogIn, Beaker } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import toast from 'react-hot-toast';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setToken = useAuthStore((state) => state.setToken);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/callsignin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setAuthenticated(true);
        setToken(data.token);
        toast.success('Successfully SignedIn');
        setFormData({ email: '', password: '' });
        setTouched({});
        window.location.href = '/';
      } else {
        setAuthenticated(false);
        setToken(null);
        toast.error('Login failed, Try again!');
      }
    } catch (error) {
      setAuthenticated(false);
      setToken(null);
      console.error('Login error:', error);
      toast.error('Login failed, Try again!');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    Object.values(errors).every(error => !error) &&
    Object.values(formData).every(value => value.trim());

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Floating Scientific Elements */}
      <div className="absolute top-20 left-10 animate-bounce"><div className="w-4 h-4 bg-indigo-400 rounded-full opacity-60"></div></div>
      <div className="absolute top-40 right-20 animate-bounce" style={{animationDelay: '1s'}}><div className="w-3 h-3 bg-cyan-400 rounded-full opacity-60"></div></div>
      <div className="absolute bottom-32 left-20 animate-bounce" style={{animationDelay: '2s'}}><div className="w-5 h-5 bg-purple-400 rounded-full opacity-60"></div></div>
      <div className="absolute bottom-20 right-10 animate-bounce" style={{animationDelay: '3s'}}><div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60"></div></div>

      {/* SignIn Box */}
      <div className="w-full max-w-md relative z-10">
        <form className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 space-y-6" onSubmit={handleSubmit}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse">
              <Beaker className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-300">Access your Labmentix laboratory portal</p>
          </div>

          {/* Fields */}
          {['email', 'password'].map((field, idx) => {
            const Icon = field === 'email' ? Mail : Lock;
            const isPassword = field === 'password';
            return (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-300 mb-2 capitalize">
                  {field === 'email' ? 'Email Address' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={isPassword ? (showPassword ? 'text' : 'password') : field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder={field === 'password' ? 'Enter your password' : 'Enter your email'}
                    className={`w-full pl-12 ${isPassword ? 'pr-12' : 'pr-4'} py-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none bg-white/5 backdrop-blur-sm text-white placeholder-gray-500 ${
                      errors[field] 
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20' 
                        : touched[field] && !errors[field]
                        ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20'
                        : 'border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                    }`}
                  />
                  {isPassword && (
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  )}
                  {touched[field] && !errors[field] && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <Check className="w-5 h-5 text-emerald-400" />
                    </div>
                  )}
                </div>
                {errors[field] && (
                  <div className="flex items-center gap-2 mt-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors[field]}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Forgot Password Link */}
          <div className="text-right">
            <button 
              type="button"
              className="text-sm font-semibold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text hover:from-indigo-300 hover:to-cyan-300 transition-all duration-200"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="group relative w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Sign In
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
          </button>

          {/* Footer */}
          <div className="mt-6 text-center">
           <p className="text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <button 
            type="button"
            className="font-semibold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text hover:from-indigo-300 hover:to-cyan-300 transition-all duration-200"
          >
            Sign Up
          </button>
        </p>
          </div>
        </form>

        {/* Extra Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Secure laboratory access powered by{' '}
            <span className="font-semibold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text">
              Labmentix
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}