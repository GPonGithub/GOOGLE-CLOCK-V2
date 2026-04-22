import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Bell, Trash2 } from 'lucide-react';

interface Alarm {
  id: string;
  time: string;
  days: string[];
  enabled: boolean;
  label: string;
}

const INITIAL_ALARMS: Alarm[] = [
  { id: '1', time: '07:30', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], enabled: true, label: 'Work' },
  { id: '2', time: '09:00', days: ['Sat', 'Sun'], enabled: false, label: 'Weekend' },
];

export default function AlarmView() {
  const [alarms, setAlarms] = useState<Alarm[]>(INITIAL_ALARMS);

  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(a => a.id !== id));
  };

  return (
    <div id="alarm-view" className="p-6 h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-tight">
          <Bell className="w-5 h-5 text-blue-400" />
          Alarm
        </h2>
        <button id="add-alarm-btn" className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {alarms.map((alarm) => (
            <motion.div
              key={alarm.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                alarm.enabled 
                  ? 'bg-slate-900 border-blue-500/30' 
                  : 'bg-slate-950 border-slate-800 opacity-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div onClick={() => toggleAlarm(alarm.id)} className="cursor-pointer flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold font-mono tracking-tighter text-white">
                      {alarm.time}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                      const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                      const isActive = alarm.days.includes(dayNames[i]);
                      return (
                        <span 
                          key={i} 
                          className={`text-[10px] w-6 h-6 flex items-center justify-center rounded-lg font-bold font-mono border ${
                            isActive 
                              ? 'bg-blue-600/10 text-blue-400 border-blue-500/20' 
                              : 'bg-slate-950 text-slate-700 border-slate-800/50'
                          }`}
                        >
                          {day}
                        </span>
                      );
                    })}
                  </div>
                  {alarm.label && (
                    <p className="mt-3 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      {alarm.label}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-6 h-full">
                  <div 
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 cursor-pointer ${
                      alarm.enabled ? 'bg-blue-600' : 'bg-slate-800'
                    }`}
                    onClick={() => toggleAlarm(alarm.id)}
                  >
                    <motion.div 
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ left: alarm.enabled ? 'calc(100% - 20px)' : '4px' }}
                    />
                  </div>
                  <button 
                    onClick={() => deleteAlarm(alarm.id)}
                    className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
