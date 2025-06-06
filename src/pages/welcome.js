import { useState } from 'react';
import { Menu, X, Sparkles, Home, LogIn, UserPlus, Zap, MessageCircle, Star, ArrowRight, Bot, Brain, Lightbulb } from 'lucide-react';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/welcome', label: 'Home', icon: Home },
    { href: '/signin', label: 'Sign In', icon: LogIn },
    { href: '/signup', label: 'Sign Up', icon: UserPlus },
    { href: '/hero', label: 'Hero Section', icon: Zap }
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-rose-500 via-pink-500 to-blue-500 shadow-2xl w-full sticky top-0 z-50 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Labmentix
                </h3>
                <p className="text-xs text-white/70 font-medium">AI Powered Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a key={index} href={item.href} className="inline-block">
                    <button className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 font-medium transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                      <IconComponent className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>{item.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                    </button>
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-3 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="space-y-4">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <a key={index} href={item.href} className="block">
                      <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group w-full flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 font-medium transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                          <IconComponent className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="flex-1 text-left">{item.label}</span>
                        <div className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors duration-300"></div>
                      </button>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -top-8 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-6 right-8 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </nav>

      {/* AI Chatbot Advertisement Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
              <span className="text-purple-300 font-medium">Welcome to the Future</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
              AI Chatbot
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of conversational AI. Get instant answers, creative solutions, and intelligent assistance powered by cutting-edge technology.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Conversations</h3>
              <p className="text-gray-400 leading-relaxed">Engage in natural, intelligent conversations that understand context and provide meaningful responses.</p>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Creative Solutions</h3>
              <p className="text-gray-400 leading-relaxed">Get innovative ideas, creative writing assistance, and problem-solving support for any challenge.</p>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">Instant responses with powerful processing capabilities that adapt to your needs in real-time.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Start Chatting Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg flex items-center gap-3">
                <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Learn More</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2">Trusted by 10,000+ users worldwide</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce" style={{animationDelay: '0s'}}>
          <div className="w-4 h-4 bg-purple-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{animationDelay: '1s'}}>
          <div className="w-3 h-3 bg-pink-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce" style={{animationDelay: '2s'}}>
          <div className="w-5 h-5 bg-blue-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce" style={{animationDelay: '3s'}}>
          <div className="w-4 h-4 bg-cyan-400 rounded-full opacity-60"></div>
        </div>
      </div>
    </>
  );
}