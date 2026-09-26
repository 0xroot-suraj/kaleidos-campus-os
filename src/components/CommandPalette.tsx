import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Map, Ticket, SearchIcon, Wrench, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Handle Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Since we don't have global state for this in this simple mock, 
        // we assume AppShell manages it.
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands = [
    { name: 'My timetable', icon: Calendar, action: () => navigate('/student/timetable') },
    { name: 'Campus Navigator', icon: Map, action: () => navigate('/student/navigator') },
    { name: 'Upcoming events', icon: Ticket, action: () => navigate('/student/events') },
    { name: 'LostLoop', icon: SearchIcon, action: () => navigate('/student/lostloop') },
    { name: 'Report campus issue', icon: Wrench, action: () => navigate('/student/fixmycampus') },
  ];

  const filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-navy-100"
          >
            <div className="flex items-center px-4 py-3 border-b border-navy-100">
              <Search className="w-5 h-5 text-navy-400 mr-3" />
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none focus:outline-none text-lg text-navy-900 placeholder:text-navy-300"
                placeholder="Ask or search your campus..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button onClick={onClose} className="p-1 text-navy-400 hover:text-navy-900 rounded-lg hover:bg-navy-50">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-2 max-h-96 overflow-y-auto">
              {query === '' ? (
                <>
                  <div className="px-3 py-2 text-xs font-semibold text-navy-400 uppercase tracking-wider">Navigate</div>
                  {commands.slice(0, 3).map((cmd, i) => (
                    <button 
                      key={i} onClick={() => { cmd.action(); onClose(); }}
                      className="w-full flex items-center px-3 py-3 text-left hover:bg-navy-50 rounded-xl transition-colors group"
                    >
                      <cmd.icon className="w-5 h-5 text-navy-400 group-hover:text-electric-indigo mr-3" />
                      <span className="text-navy-900 font-medium group-hover:text-electric-indigo">{cmd.name}</span>
                    </button>
                  ))}
                  
                  <div className="px-3 py-2 mt-2 text-xs font-semibold text-navy-400 uppercase tracking-wider">Actions</div>
                  {commands.slice(3).map((cmd, i) => (
                    <button 
                      key={i} onClick={() => { cmd.action(); onClose(); }}
                      className="w-full flex items-center px-3 py-3 text-left hover:bg-navy-50 rounded-xl transition-colors group"
                    >
                      <cmd.icon className="w-5 h-5 text-navy-400 group-hover:text-electric-indigo mr-3" />
                      <span className="text-navy-900 font-medium group-hover:text-electric-indigo">{cmd.name}</span>
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {filteredCommands.length > 0 ? filteredCommands.map((cmd, i) => (
                    <button 
                      key={i} onClick={() => { cmd.action(); onClose(); }}
                      className="w-full flex items-center px-3 py-3 text-left hover:bg-navy-50 rounded-xl transition-colors group"
                    >
                      <cmd.icon className="w-5 h-5 text-navy-400 group-hover:text-electric-indigo mr-3" />
                      <span className="text-navy-900 font-medium group-hover:text-electric-indigo">{cmd.name}</span>
                    </button>
                  )) : (
                    <div className="px-3 py-8 text-center text-navy-500">
                      No results found for "{query}"
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
