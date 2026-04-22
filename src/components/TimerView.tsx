import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

export default function TimerView() {
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleTimer = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const adjustTime = (amount: number) => {
    const next = Math.max(0, duration + amount);
    setDuration(next);
    setTimeLeft(next);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const progress = (timeLeft / duration) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div id="timer-view" className="flex flex-col items-center justify-center h-full p-8 space-y-12">
      <div className="relative flex items-center justify-center">
        <svg className="w-72 h-72 md:w-80 md:h-80 transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-slate-800 fill-none"
            strokeWidth="4"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-blue-500 fill-none transition-all duration-1000 shadow-xl"
            strokeWidth="6"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            style={{ strokeLinecap: 'round' }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={timeLeft}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-6xl md:text-7xl font-mono font-bold tracking-tighter text-white"
            >
              {formatTime(timeLeft)}
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex gap-4">
            {!isRunning && (
              <div className="flex gap-4">
                <button 
                  onClick={() => adjustTime(-60)} 
                  className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => adjustTime(60)} 
                  className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-12 items-center">
        <button 
          id="reset-timer-btn"
          onClick={reset}
          className="p-4 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all active:scale-95"
        >
          <RotateCcw className="w-8 h-8" />
        </button>

        <button 
          id="start-stop-timer-btn"
          onClick={toggleTimer}
          className={`w-20 h-20 flex items-center justify-center rounded-[1.5rem] shadow-xl transition-all active:scale-90 ${
            isRunning ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-blue-600 text-white shadow-blue-600/20'
          }`}
        >
          {isRunning ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
        </button>
      </div>
    </div>
  );
}
