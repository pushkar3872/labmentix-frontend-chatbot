import { Brain, Lightbulb, Zap, ArrowRight, Star, Beaker, Microscope, Atom, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-full px-6 py-3 mb-6">
            <Beaker className="w-5 h-5 text-indigo-400 animate-pulse" />
            <span className="text-indigo-300 font-medium">Innovation in Laboratory Science</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-6 leading-tight">
            Labmentix
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Welcome to the future of laboratory science. Experience cutting-edge solutions, advanced research tools, and innovative technologies that transform the way we understand and explore scientific frontiers.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
              <Microscope className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Advanced Research</h3>
            <p className="text-gray-400 leading-relaxed">State-of-the-art laboratory equipment and methodologies for breakthrough scientific discoveries and research excellence.</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
              <Atom className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Molecular Innovation</h3>
            <p className="text-gray-400 leading-relaxed">Cutting-edge molecular analysis and synthesis technologies that push the boundaries of scientific understanding.</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Analytics</h3>
            <p className="text-gray-400 leading-relaxed">AI-powered data analysis and intelligent laboratory management systems for enhanced research efficiency.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/25 flex items-center gap-3">
              <Beaker className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore Our Lab</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </button>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg flex items-center gap-3">
              <Lightbulb className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Our Research</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Achievements Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400 mt-12">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2">Excellence in Research</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full"></div>
            <span>500+ Published Studies</span>
            <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full"></div>
            <span>Leading Scientific Innovation</span>
          </div>
        </div>
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
      
      {/* Additional Floating Elements for Scientific Feel */}
      <div className="absolute top-60 left-1/4 animate-pulse" style={{animationDelay: '1.5s'}}>
        <div className="w-2 h-2 bg-teal-400 rotate-45 opacity-40"></div>
      </div>
      <div className="absolute bottom-40 right-1/3 animate-pulse" style={{animationDelay: '3.5s'}}>
        <div className="w-3 h-3 bg-indigo-400 rotate-45 opacity-40"></div>
      </div>
    </div>
  );
}