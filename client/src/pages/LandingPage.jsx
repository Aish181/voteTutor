import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-slate-900 to-primary-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Badge */}
        <div className="animate-fadeIn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-slate-300 font-medium">Your guide to understanding elections</span>
        </div>

        {/* Logo */}
        <div className="animate-fadeIn delay-100" style={{ opacity: 0 }}>
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/30 mb-6">
            <span className="text-4xl">🗳️</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="animate-fadeIn delay-200 text-5xl md:text-7xl font-extrabold text-white mb-4" style={{ opacity: 0 }}>
          Vote<span className="bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">Tutor</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fadeIn delay-300 text-lg md:text-xl text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed" style={{ opacity: 0 }}>
          Learn the election process step by step. From registration to results — 
          we make democracy easy to understand.
        </p>

        {/* CTA Button */}
        <div className="animate-fadeIn delay-400" style={{ opacity: 0 }}>
          <button
            onClick={() => navigate('/home')}
            id="get-started-btn"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-primary-600/30 hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Feature pills */}
        <div className="animate-fadeIn delay-500 flex flex-wrap items-center justify-center gap-3 mt-12" style={{ opacity: 0 }}>
          {['Step-by-Step Guide', 'AI Chat Assistant', 'Interactive Quiz'].map((feature) => (
            <span key={feature} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 font-medium">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
