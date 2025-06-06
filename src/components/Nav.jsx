// components/Nav.jsx
import { useState } from 'react';
import { Menu, X, Sparkles, Home, LogIn, UserPlus, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/signin', label: 'Sign In', icon: LogIn },
    { href: '/signup', label: 'Sign Up', icon: UserPlus },
    { href: '/hero', label: 'Ai Chatbot', icon: Zap },
    // { href: '/demy', label: 'Demo ', icon: Zap },
  ];

  return (
    <nav className="bg-gradient-to-r from-rose-500 via-pink-500 to-blue-500 shadow-2xl w-full sticky top-0 z-50 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Labmentix</h3>
              <p className="text-xs text-white/70 font-medium">AI Powered Platform</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ href, label, icon: Icon }, index) => (
              <Link href={href} key={index}>
                <button className="group relative px-6 py-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all border border-white/20 hover:border-white/40 shadow-lg flex items-center gap-2">
                  <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>{label}</span>
                </button>
              </Link>
            ))}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-3 bg-white/10 text-white rounded-2xl border border-white/20 shadow-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0 overflow-hidden'}`}>
          <div className="bg-white/10 rounded-3xl p-4 border border-white/20 shadow-2xl">
            {navItems.map(({ href, label, icon: Icon }, index) => (
              <Link key={index} href={href}>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-4 px-4 py-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all border border-white/20 shadow-md"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
