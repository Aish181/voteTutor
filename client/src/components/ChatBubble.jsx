export default function ChatBubble({ message, isUser, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-start" id="chat-loading">
        <div className="max-w-[80%] px-5 py-4 rounded-2xl rounded-bl-md bg-white dark:bg-dark-surface border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">VoteTutor is thinking...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      <div
        className={`max-w-[80%] px-5 py-3.5 shadow-sm ${
          isUser
            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl rounded-br-md'
            : 'bg-white dark:bg-dark-surface border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 rounded-2xl rounded-bl-md'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm">🗳️</span>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">VoteTutor</span>
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}
