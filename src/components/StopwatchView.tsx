import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function StopwatchView() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startStop = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
  };

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const lap = () => {
    setLaps([time, ...laps]);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div id="stopwatch-view" className="flex flex-col h-full bg-slate-950">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-7xl md:text-8xl font-mono font-bold tracking-tighter text-white mb-12">
          {formatTime(time)}
        </div>

        <div className="flex gap-16 items-center">
          <button 
            id="reset-lap-btn"
            onClick={isRunning ? lap : reset}
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all active:scale-95 disabled:opacity-30"
            disabled={time === 0 && !isRunning}
          >
            {isRunning ? <Flag className="w-7 h-7" /> : <RotateCcw className="w-7 h-7" />}
          </button>

          <button 
            id="start-stop-btn"
            onClick={startStop}
            className={`w-24 h-24 flex items-center justify-center rounded-[2rem] shadow-2xl transition-all active:scale-90 ${
              isRunning ? 'bg-slate-100 text-slate-900' : 'bg-blue-600 text-white shadow-blue-600/30'
            }`}
          >
            {isRunning ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
          </button>
        </div>
      </div>

      <div className="h-1/3 bg-slate-900 border-t border-slate-800 rounded-t-[3rem] p-8 overflow-hidden flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Lap Chronicle</h3>
          <div className="text-[10px] font-mono text-blue-400">{laps.length} Splits</div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-2">
          <AnimatePresence mode="popLayout">
            {laps.map((lapTime, index) => {
              const diff = index < laps.length - 1 ? lapTime - laps[index + 1] : lapTime;
              return (
                <motion.div
                  key={laps.length - index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold font-mono text-slate-700">{(laps.length - index).toString().padStart(2, '0')}</span>
                    <span className="text-white font-mono text-xl font-bold tracking-tight">{formatTime(lapTime)}</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-xs font-medium">+{formatTime(diff)}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
