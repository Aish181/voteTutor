import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import ChatPage from './pages/ChatPage';
import QuizPage from './pages/QuizPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout({ darkMode, setDarkMode }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      {!isLanding && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('votetutor-dark');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('votetutor-dark', darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AppLayout darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  );
}
