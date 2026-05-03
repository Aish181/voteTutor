import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizQuestions } from '../data/quiz';
import QuizCard from '../components/QuizCard';

export default function QuizPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];
  const total = quizQuestions.length;
  const progress = ((current + (answered ? 1 : 0)) / total) * 100;

  const handleSelect = (index) => {
    setSelected(index);
    setAnswered(true);
    if (index === q.correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const getScoreMessage = () => {
    const pct = score / total;
    if (pct === 1) return { emoji: '🏆', title: 'Perfect Score!', msg: "You're an election expert!" };
    if (pct >= 0.8) return { emoji: '🌟', title: 'Great Job!', msg: 'You know your stuff!' };
    if (pct >= 0.6) return { emoji: '👍', title: 'Good Effort!', msg: 'Keep learning and improving!' };
    return { emoji: '📚', title: 'Keep Learning!', msg: 'Check out our guide to learn more.' };
  };

  if (finished) {
    const sm = getScoreMessage();
    return (
      <div className="page-container">
        <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fadeIn">
          <div className="glass-card p-10">
            <span className="text-6xl block mb-4">{sm.emoji}</span>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{sm.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">{sm.msg}</p>
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-700 dark:text-primary-300">{score}/{total}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={handleRetry} id="quiz-retry" className="btn-primary">🔄 Try Again</button>
              <button onClick={() => navigate('/guide')} id="quiz-to-guide" className="btn-secondary">📖 Study Guide</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm font-semibold mb-4">
            <span>🧠</span> Knowledge Quiz
          </div>
          <h1 className="section-title mb-2">Test Your <span className="gradient-text">Knowledge</span></h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Answer {total} questions about the election process</p>
        </div>

        {/* Progress */}
        <div className="mb-8 animate-fadeIn delay-100" style={{ opacity: 0 }}>
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
            <span>Question {current + 1} of {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-8 mb-6" key={current}>
          <QuizCard
            question={q.question}
            options={q.options}
            selectedIndex={selected}
            correctIndex={q.correctIndex}
            answered={answered}
            onSelect={handleSelect}
          />
        </div>

        {/* Explanation */}
        {answered && (
          <div className={`p-5 rounded-2xl mb-6 animate-fadeIn ${selected === q.correctIndex ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40'}`}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{selected === q.correctIndex ? '✅' : '❌'}</span>
              <div>
                <p className={`text-sm font-semibold mb-1 ${selected === q.correctIndex ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                  {selected === q.correctIndex ? 'Correct!' : 'Not quite right'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next button */}
        {answered && (
          <div className="text-center animate-fadeIn">
            <button onClick={handleNext} id="quiz-next" className="btn-primary">
              {current + 1 < total ? 'Next Question →' : 'See Results 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
