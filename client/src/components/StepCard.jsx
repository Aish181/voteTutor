import { useState } from 'react';

export default function StepCard({ step, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="animate-fadeIn"
      style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="glass-card-hover p-6 cursor-pointer group"
        id={`step-card-${step.id}`}
      >
        <div className="flex items-start gap-4">
          {/* Step number badge */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
            <span className="text-2xl">{step.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                  Step {step.id}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">
                  {step.title}
                </h3>
              </div>

              {/* Expand icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${expanded ? 'bg-primary-100 dark:bg-primary-900/30 rotate-180' : 'bg-slate-100 dark:bg-slate-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              {step.description}
            </p>

            {/* Timeline badge */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-xs font-medium text-slate-600 dark:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {step.timeline}
            </div>
          </div>
        </div>

        {/* Expanded details */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-96 opacity-100 mt-5' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-slate-200/60 dark:border-slate-600/30 pt-4">
            <ul className="space-y-3">
              {step.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mt-0.5`}>
                    <span className="text-white text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
