import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Globe } from 'lucide-react';

const DEFAULT_CITIES = [
  { id: '1', name: 'London', timezone: 'Europe/London' },
  { id: '2', name: 'New York', timezone: 'America/New_York' },
  { id: '3', name: 'Tokyo', timezone: 'Asia/Tokyo' },
];

export default function WorldClockView() {
  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const removeCity = (id: string) => {
    setCities(cities.filter(c => c.id !== id));
  };

  return (
    <div id="world-clock-view" className="p-6 h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-tight">
          <Globe className="w-5 h-5 text-blue-400" />
          World Clock
        </h2>
        <button id="add-city-btn" className="p-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all active:scale-95">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="grid gap-4 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {cities.map((city) => {
            const cityTime = toZonedTime(time, city.timezone);
            const isToday = format(cityTime, 'd') === format(time, 'd');
            
            return (
              <motion.div
                key={city.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex justify-between items-center group hover:border-slate-600 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-bold text-white">{city.name}</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                    {isToday ? 'Today' : format(cityTime, 'EEE, MMM d')}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-3xl font-mono font-bold tracking-tighter text-white">
                      {format(cityTime, 'HH:mm')}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono uppercase">
                      GMT{format(cityTime, 'xxx')}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeCity(city.id)}
                    className="p-2 opacity-0 group-hover:opacity-100 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
