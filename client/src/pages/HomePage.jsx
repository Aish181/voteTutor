import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faqs } from '../data/faq';

export default function HomePage() {
  const navigate = useNavigate();
  const [quickQuestion, setQuickQuestion] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleQuickAsk = (e) => {
    e.preventDefault();
    if (quickQuestion.trim()) {
      navigate('/chat', { state: { prefill: quickQuestion.trim() } });
    }
  };

  const features = [
    {
      title: 'Learn Steps',
      description: 'Explore the election process from registration to results',
      icon: '📖',
      color: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/20',
      path: '/guide',
    },
    {
      title: 'Timeline',
      description: 'See the full election timeline at a glance',
      icon: '📅',
      color: 'from-violet-500 to-purple-500',
      shadow: 'shadow-violet-500/20',
      path: '/guide',
    },
    {
      title: 'Quiz',
      description: 'Test your knowledge with fun election questions',
      icon: '🧠',
      color: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/20',
      path: '/quiz',
    },
  ];

  return (
    <div className="page-container">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="section-title mb-3">
            What would you like to <span className="gradient-text">learn</span> today?
          </h1>
          <p className="section-subtitle mx-auto">
            Ask anything about the election process, or explore our guided learning paths below.
          </p>
        </div>

        {/* Quick Ask */}
        <form onSubmit={handleQuickAsk} className="animate-fadeIn delay-100 max-w-2xl mx-auto mb-14" style={{ opacity: 0 }}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity" />
            <div className="relative flex items-center bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60">
              <div className="pl-5 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                placeholder="Ask anything about elections..."
                id="quick-ask-input"
                className="flex-1 px-4 py-4 bg-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none text-base"
              />
              <button
                type="submit"
                id="quick-ask-btn"
                className="mr-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all active:scale-95"
              >
                Ask AI
              </button>
            </div>
          </div>
        </form>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {features.map((feature, index) => (
            <button
              key={feature.title}
              onClick={() => navigate(feature.path)}
              id={`feature-${feature.title.toLowerCase().replace(/\s/g, '-')}`}
              className="animate-fadeIn text-left glass-card-hover p-6 group"
              style={{ animationDelay: `${(index + 2) * 150}ms`, opacity: 0 }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg ${feature.shadow} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all">
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="animate-fadeIn delay-500" style={{ opacity: 0 }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Quick answers to common election questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  id={`faq-${faq.id}`}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${openFaq === faq.id ? 'bg-primary-100 dark:bg-primary-900/30 rotate-180' : 'bg-slate-100 dark:bg-slate-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === faq.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-4 border-t border-slate-200/60 dark:border-slate-700/30 pt-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
