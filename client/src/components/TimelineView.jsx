import { steps } from '../data/steps';

export default function TimelineView() {
  return (
    <div className="relative" id="timeline-section">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-violet-500 via-emerald-500 to-amber-500 rounded-full" />

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative flex items-start gap-6 animate-fadeIn"
            style={{ animationDelay: `${index * 200}ms`, opacity: 0 }}
          >
            {/* Node */}
            <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
              <span className="text-xl">{step.icon}</span>
            </div>

            {/* Content */}
            <div className="glass-card p-5 flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                  Step {step.id}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {step.timeline}
                </span>
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-lg">
                {step.title}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}

        {/* Final node */}
        <div
          className="relative flex items-center gap-6 animate-fadeIn"
          style={{ animationDelay: `${steps.length * 200}ms`, opacity: 0 }}
        >
          <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
            <span className="text-xl">✅</span>
          </div>
          <div className="glass-card p-5 flex-1">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-lg">
              Democracy in Action!
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              The elected officials take office and begin serving the people. Your vote made a difference!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
