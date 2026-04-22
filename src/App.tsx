import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Globe, Bell, Timer, Timer as StopwatchIcon, MoreVertical } from 'lucide-react';
import ClockView from './components/ClockView';
import WorldClockView from './components/WorldClockView';
import AlarmView from './components/AlarmView';
import TimerView from './components/TimerView';
import StopwatchView from './components/StopwatchView';

type View = 'alarm' | 'clock' | 'world' | 'timer' | 'stopwatch';

const NAV_ITEMS = [
  { id: 'alarm' as View, label: 'Alarm', icon: Bell },
  { id: 'clock' as View, label: 'Clock', icon: Clock },
  { id: 'world' as View, label: 'World', icon: Globe },
  { id: 'timer' as View, label: 'Timer', icon: Timer },
  { id: 'stopwatch' as View, label: 'Stopwatch', icon: StopwatchIcon },
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('clock');

  const renderView = () => {
    switch (currentView) {
      case 'alarm': return <AlarmView />;
      case 'clock': return <ClockView />;
      case 'world': return <WorldClockView />;
      case 'timer': return <TimerView />;
      case 'stopwatch': return <StopwatchView />;
      default: return <ClockView />;
    }
  };

  return (
    <div id="app-container" className="flex flex-col h-screen max-w-4xl mx-auto bg-slate-950 text-slate-200 overflow-hidden shadow-2xl relative p-6 gap-6">
      <header className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-sm font-mono text-blue-400 tracking-widest uppercase">Global Chronometer Hub</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-bold tracking-tight text-white">Google Clock</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-800 border border-slate-700 text-slate-400 mt-1">v3.0.0</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Active Module</span>
          <span className="text-lg font-semibold text-emerald-400 uppercase">{currentView}</span>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="h-full bento-card overflow-hidden"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="flex justify-center gap-4 bg-slate-900/40 p-3 rounded-full border border-slate-800 backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 relative ${
                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className={`text-xs font-bold tracking-tight uppercase ${isActive ? 'block' : 'hidden md:block'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <footer className="flex justify-between items-center text-[10px] text-slate-600 font-mono tracking-widest uppercase">
        <div className="flex gap-4">
          <span>BRANCH: GOOGLE-CLOCK_branch_01</span>
          <span>ENV: PRODUCTION_BENTO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>SYSTEMS NOMINAL</span>
        </div>
      </footer>
    </div>
  );
}


