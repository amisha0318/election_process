import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, MapPin, CheckCircle, Clock, Globe, Menu, X, Loader2 } from 'lucide-react';
import ChatBot from './components/ChatBot';

// Lazy loading components for maximum efficiency
const Timeline = lazy(() => import('./components/Timeline'));
const EligibilityChecker = lazy(() => import('./components/EligibilityChecker'));
const PollingFinder = lazy(() => import('./components/PollingFinder'));
const ElectionCalendar = lazy(() => import('./components/ElectionCalendar'));
const Hero = lazy(() => import('./components/Hero'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
    <Loader2 className="animate-spin mb-4" size={48} />
    <p className="text-sm font-medium animate-pulse">Optimizing experience...</p>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'timeline', label: 'Election Cycle', icon: Clock },
    { id: 'eligibility', label: 'Eligibility', icon: CheckCircle },
    { id: 'polling', label: 'Find Polling', icon: MapPin },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-500/30">
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-4 left-4 z-[100] bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
        Skip to content
      </a>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex items-center justify-between border-b-0" role="navigation">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold" aria-hidden="true">🇺🇸</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Vote<span className="text-blue-500">Wise</span></h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          <button className="p-2 text-slate-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase border border-white/10 rounded-lg hover:bg-white/5 transition-all">
            <Globe size={14} /> EN/ES
          </button>
          
          <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-4 right-4 z-40 glass-card p-4 flex flex-col gap-2"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  activeTab === tab.id ? 'bg-blue-600' : 'hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main id="main-content" tabIndex="-1" className="flex-grow container mx-auto px-4 py-12 outline-none">
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Hero onStart={() => setActiveTab('timeline')} />
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Timeline />
              </motion.div>
            )}

            {activeTab === 'eligibility' && (
              <motion.div
                key="eligibility"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <EligibilityChecker />
              </motion.div>
            )}

            {activeTab === 'polling' && (
              <motion.div
                key="polling"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <PollingFinder />
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ElectionCalendar />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </main>

      <ChatBot />

      <footer className="py-8 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2026 VoteWise Election Assistant. Non-partisan educational resource.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Official Gov Links</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
