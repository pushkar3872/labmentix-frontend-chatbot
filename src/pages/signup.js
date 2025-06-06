import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Sparkles, Check, AlertCircle, Loader2, Beaker } from 'lucide-react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) 
          return 'Password must contain uppercase, lowercase, and number';
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
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });
    
    if (Object.keys(newErrors).length > 0) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Account created successfully! 🎉');
      setFormData({ name: '', email: '', password: '' });
      setTouched({});
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    if (score < 2) return { strength: 25, label: 'Weak', color: 'bg-red-400' };
    if (score < 4) return { strength: 50, label: 'Fair', color: 'bg-yellow-400' };
    if (score < 5) return { strength: 75, label: 'Good', color: 'bg-indigo-400' };
    return { strength: 100, label: 'Strong', color: 'bg-emerald-400' };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const isFormValid = Object.values(errors).every(error => !error) && 
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
      <div className="absolute top-20 left-10 animate-bounce" style={{animationDelay: '0s'}}>
        <div className="w-4 h-4 bg-indigo-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 animate-bounce" style={{animationDelay: '1s'}}>
        <div className="w-3 h-3 bg-cyan-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce" style={{animationDelay: '2s'}}>
        <div className="w-5 h-5 bg-purple-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce" style={{animationDelay: '3s'}}>
        <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse">
            <Beaker className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-2">
            Join Labmentix
          </h1>
          <p className="text-gray-300">Create your laboratory research account</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 ${
                    errors.name 
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20' 
                      : touched.name && !errors.name
                      ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20'
                      : 'border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                  }`}
                />
                {touched.name && !errors.name && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                )}
              </div>
              {errors.name && (
                <div className="flex items-center gap-2 mt-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 ${
                    errors.email 
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20' 
                      : touched.email && !errors.email
                      ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20'
                      : 'border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                  }`}
                />
                {touched.email && !errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                )}
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Create a strong password"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 ${
                    errors.password 
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20' 
                      : touched.password && !errors.password
                      ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20'
                      : 'border-white/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-400">Password Strength</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.color === 'bg-red-400' ? 'text-red-400' :
                      passwordStrength.color === 'bg-yellow-400' ? 'text-yellow-400' :
                      passwordStrength.color === 'bg-indigo-400' ? 'text-indigo-400' : 'text-emerald-400'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.password}</span>
                </div>
              )}
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
                  Creating Account...
                </>
              ) : (
                <>
                  <Beaker className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Create Account
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button className="font-semibold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text hover:from-indigo-300 hover:to-cyan-300 transition-all duration-200">
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <button className="underline hover:text-gray-400 transition-colors duration-200">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="underline hover:text-gray-400 transition-colors duration-200">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}