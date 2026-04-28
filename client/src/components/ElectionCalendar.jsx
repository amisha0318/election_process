import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Bell, ChevronRight, Share2, Plus, Info } from 'lucide-react';
import { createCalendarEvent } from '../services/calendarService';

const ElectionCalendar = () => {
  const dates = [
    { 
      id: 'reg-deadline',
      date: '2026-10-05', 
      displayDate: 'Oct 5, 2026',
      event: 'Voter Registration Deadline', 
      type: 'Deadline', 
      color: 'text-red-400',
      desc: 'Last day to register for the General Election in most states.'
    },
    { 
      id: 'early-voting',
      date: '2026-10-19', 
      displayDate: 'Oct 19, 2026',
      event: 'Early Voting Period Begins', 
      type: 'Voting', 
      color: 'text-green-400',
      desc: 'Avoid the lines and vote early at designated locations.'
    },
    { 
      id: 'general-election',
      date: '2026-11-03', 
      displayDate: 'Nov 3, 2026',
      event: '2026 Midterm Election Day', 
      type: 'Major', 
      color: 'text-white',
      desc: 'Nationwide voting for House, Senate, and local offices.'
    }
  ];

  const handleAddEvent = async (item) => {
    try {
      await createCalendarEvent(
        item.event,
        item.date,
        item.desc
      );
    } catch (error) {
      console.error('Calendar error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Election Calendar</h2>
          <p className="text-slate-400">Important dates for the upcoming 2026 Midterms.</p>
        </div>
        <button className="btn-secondary flex items-center gap-2 text-sm py-2">
          <Bell size={16} /> Get All Reminders
        </button>
      </div>

      <div className="space-y-4">
        {dates.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center justify-between group hover:border-blue-500/20 transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex flex-col items-center justify-center border border-white/10 group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all">
                <span className="text-[10px] uppercase font-bold text-slate-500 group-hover:text-blue-400">{item.displayDate.split(' ')[0]}</span>
                <span className="text-xl font-bold">{item.displayDate.split(' ')[1].replace(',', '')}</span>
              </div>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${item.color}`}>{item.type}</span>
                <h4 className="text-lg font-bold">{item.event}</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md">{item.desc}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleAddEvent(item)}
                aria-label={`Add ${item.event} to Google Calendar`}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              >
                <Plus size={18} />
              </button>
              <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 glass-card border-blue-500/10 bg-blue-500/[0.02] flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
          <CalendarIcon className="text-blue-500" size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Sync with your Personal Calendar</h3>
          <p className="text-slate-400 text-sm mb-4">Never miss a deadline. Sync all local and national election dates directly to your Google or Apple calendar.</p>
          <button className="btn-primary flex items-center gap-2">
            Sync Now <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionCalendar;
