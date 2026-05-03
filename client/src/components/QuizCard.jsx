export default function QuizCard({ question, options, selectedIndex, correctIndex, answered, onSelect }) {
  const getOptionStyle = (index) => {
    if (!answered) {
      return selectedIndex === index
        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20'
        : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-dark-surface hover:border-primary-300 dark:hover:border-primary-500/40 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 text-slate-700 dark:text-slate-200';
    }

    if (index === correctIndex) {
      return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20';
    }
    if (index === selectedIndex && index !== correctIndex) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 ring-2 ring-red-500/20';
    }
    return 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-dark-surface/50 text-slate-400 dark:text-slate-500';
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="animate-fadeIn">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 leading-relaxed">
        {question}
      </h3>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !answered && onSelect(index)}
            disabled={answered}
            id={`quiz-option-${index}`}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${getOptionStyle(index)} ${!answered ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
          >
            <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
              answered && index === correctIndex
                ? 'bg-emerald-500 text-white'
                : answered && index === selectedIndex && index !== correctIndex
                ? 'bg-red-500 text-white'
                : selectedIndex === index && !answered
                ? 'bg-primary-500 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
            }`}>
              {answered && index === correctIndex ? '✓' : answered && index === selectedIndex && index !== correctIndex ? '✗' : optionLabels[index]}
            </span>
            <span className="text-sm font-medium">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
