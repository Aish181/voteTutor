import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';

const API_URL = '/api/chat';
const SUGGESTED = [
  "How do I register to vote?",
  "What happens on Election Day?",
  "What is the Electoral College?",
  "Can I vote by mail?",
];

export default function ChatPage() {
  const location = useLocation();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm VoteTutor 🗳️ — your friendly guide to understanding elections.\n\nAsk me anything about voter registration, the election process, or how results are determined!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const prefilled = useRef(false);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  useEffect(() => {
    if (location.state?.prefill && !prefilled.current) {
      prefilled.current = true;
      send(location.state.prefill);
    }
  }, [location.state]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setMessages(p => [...p, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      setMessages(p => [...p, { role: 'assistant', content: res.ok ? data.reply : `⚠️ ${data.error}` }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: "⚠️ Could not connect to the server. Make sure the backend is running on port 3001." }]);
    } finally { setLoading(false); inputRef.current?.focus(); }
  };

  return (
    <div className="page-container flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="border-b border-slate-200/60 dark:border-slate-700/40 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
            <span className="text-lg">🗳️</span>
          </div>
          <div>
            <h2 className="font-bold text-slate-800 dark:text-white text-sm">VoteTutor AI</h2>
            <p className="text-xs text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Online
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((m, i) => <ChatBubble key={i} message={m.content} isUser={m.role === 'user'} />)}
          {loading && <ChatBubble isLoading />}
          <div ref={endRef} />
        </div>
      </div>

      {messages.length <= 1 && !loading && (
        <div className="px-4 pb-2">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-slate-400 mb-2 font-medium">Suggested:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map(q => (
                <button key={q} onClick={() => send(q)} className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-primary-300 hover:text-primary-600 transition-all">{q}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-slate-200/60 dark:border-slate-700/40 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm px-4 py-4">
        <form onSubmit={e => { e.preventDefault(); send(); }} className="max-w-3xl mx-auto flex items-center gap-3">
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about elections..." disabled={loading} id="chat-input" className="flex-1 px-5 py-3.5 bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all text-sm disabled:opacity-50" />
          <button type="submit" disabled={loading || !input.trim()} id="chat-send-btn" className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all active:scale-95 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}
