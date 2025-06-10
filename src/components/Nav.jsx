import { useState } from 'react';
import { Menu, X, Sparkles, Home, LogIn, UserPlus, Zap } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '../store/auth';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    ...(isAuthenticated
      ? [
          { href: '/hero', label: 'Ai Chatbot', icon: Zap },
          { href: '/chathistory', label: 'Ai Chat History', icon: Zap },
          { href: '/signout', label: 'Sign Out', icon: Zap },
        ]
      : [
          { href: '/signin', label: 'Sign In', icon: LogIn },
          { href: '/signup', label: 'Sign Up', icon: UserPlus },
        ]),
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-rose-500 via-pink-500 to-blue-500 shadow-2xl w-full sticky top-0 z-50 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">Labmentix</h3>
              <p className="text-[10px] sm:text-xs text-white/70 font-medium">AI Powered Platform</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center flex-wrap gap-1 sm:gap-2">
            {navItems.map(({ href, label, icon: Icon }, index) => (
              <Link href={href} key={index}>
                <button className="group relative px-3 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white/10 text-white rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all border border-white/20 hover:border-white/40 shadow-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                  <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>{label}</span>
                </button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 sm:p-3 bg-white/10 text-white rounded-xl sm:rounded-2xl border border-white/20 shadow-lg"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-96 mt-3' : 'max-h-0 overflow-hidden'}`}>
          <div className="bg-white/10 rounded-2xl sm:rounded-3xl p-2 sm:p-4 border border-white/20 shadow-2xl">
            {navItems.map(({ href, label, icon: Icon }, index) => (
              <Link key={index} href={href}>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-2 sm:gap-4 px-3 py-2 sm:px-4 sm:py-3 bg-white/10 text-white rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all border border-white/20 shadow-md text-xs sm:text-sm"
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