import { useState } from 'react';
import { Menu, X, Sparkles, Home, LogIn, UserPlus, Zap } from 'lucide-react';

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
  );
}
