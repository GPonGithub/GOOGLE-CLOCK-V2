import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'motion/react';

export default function ClockView() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="clock-view" className="flex flex-col items-center justify-center h-full space-y-8 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-slate-800 flex items-center justify-center bg-slate-900/40 shadow-2xl"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-1.5 h-20 md:h-24 bg-blue-500 rounded-full absolute bottom-1/2 origin-bottom shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            animate={{ rotate: time.getHours() * 30 + time.getMinutes() * 0.5 }}
            transition={{ type: "spring", stiffness: 50 }}
          />
          <motion.div 
            className="w-1 h-28 md:h-32 bg-slate-400 rounded-full absolute bottom-1/2 origin-bottom"
            animate={{ rotate: time.getMinutes() * 6 }}
            transition={{ type: "spring", stiffness: 50 }}
          />
          <motion.div 
            className="w-0.5 h-32 md:h-36 bg-emerald-500 rounded-full absolute bottom-1/2 origin-bottom shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            animate={{ rotate: time.getSeconds() * 6 }}
            transition={{ type: "tween", ease: "linear" }}
          />
          <div className="w-4 h-4 bg-slate-950 rounded-full z-10 border-2 border-slate-700" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex justify-center items-baseline">
          <h1 className="text-7xl md:text-8xl font-mono font-bold tracking-tighter text-white">
            {format(time, 'HH:mm')}
            <span className="text-2xl md:text-3xl text-slate-600 ml-2">
              {format(time, 'ss')}
            </span>
          </h1>
        </div>
        <p className="text-sm font-mono text-slate-400 mt-4 tracking-widest uppercase flex items-center justify-center gap-4">
          <span>{format(time, 'EEEE')}</span>
          <span className="text-slate-700">|</span>
          <span>{format(time, 'MMM d, yyyy')}</span>
        </p>
      </motion.div>
    </div>
  );
}
