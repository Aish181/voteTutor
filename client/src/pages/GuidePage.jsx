import { useState } from 'react';
import { steps } from '../data/steps';
import StepCard from '../components/StepCard';
import TimelineView from '../components/TimelineView';

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState('steps');

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
            <span>📖</span>
            Election Process Guide
          </div>
          <h1 className="section-title mb-3">
            How Elections <span className="gradient-text">Work</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Follow the journey from voter registration to election results in four clear steps.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-10 animate-fadeIn delay-100" style={{ opacity: 0 }}>
          <button
            onClick={() => setActiveTab('steps')}
            id="tab-steps"
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'steps'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white dark:bg-dark-surface border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/10'
            }`}
          >
            📋 Step-by-Step
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            id="tab-timeline"
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'timeline'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white dark:bg-dark-surface border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/10'
            }`}
          >
            📅 Timeline View
          </button>
        </div>

        {/* Content */}
        {activeTab === 'steps' ? (
          <div className="space-y-4">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        ) : (
          <TimelineView />
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fadeIn">
          <div className="glass-card p-8 max-w-lg mx-auto">
            <span className="text-3xl mb-3 block">💡</span>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">
              Still have questions?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Ask our AI assistant anything about the election process.
            </p>
            <a
              href="/chat"
              id="guide-chat-cta"
              className="btn-primary text-sm"
            >
              💬 Chat with VoteTutor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
