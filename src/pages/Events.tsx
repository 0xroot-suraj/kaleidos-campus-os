import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Search, Filter, MapPin, Calendar, Clock, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Events() {
  const { events, registerEvent } = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const publishedEvents = events.filter(e => e.status === 'Published');

  const handleRegister = (id: string) => {
    registerEvent(id);
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent({ ...selectedEvent, isRegistered: true, registered: selectedEvent.registered + 1 });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Campus Events</h1>
          <p className="text-navy-500 mt-1">Discover and register for upcoming activities.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-navy-200 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedEvents.map((event, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            key={event.id} 
            className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden flex flex-col group hover:border-electric-indigo transition-colors"
          >
            <div className={`h-32 bg-gradient-to-r ${
              event.category === 'Academic' ? 'from-blue-500 to-indigo-600' :
              event.category === 'Club' ? 'from-purple-500 to-pink-500' :
              'from-emerald-400 to-teal-500'
            } p-4 flex flex-col justify-between relative`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <span className="relative w-max px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold uppercase tracking-wider">
                {event.category}
              </span>
              <div className="relative text-white">
                <p className="text-2xl font-black">{event.date.split(' ')[1]}</p>
                <p className="text-sm font-medium">{event.date.split(' ')[0]}</p>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-navy-900 mb-2">{event.title}</h3>
              <p className="text-sm text-navy-500 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-6 mt-auto">
                <div className="flex items-center gap-2 text-sm text-navy-600 font-medium">
                  <MapPin className="w-4 h-4 text-navy-400" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600 font-medium">
                  <Clock className="w-4 h-4 text-navy-400" />
                  {event.time}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy-50">
                <div className="text-sm text-navy-500 font-medium">
                  <span className={event.isRegistered ? "text-electric-indigo font-bold" : ""}>{event.registered}</span> / {event.capacity} registered
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="px-3 py-1.5 text-navy-600 hover:bg-navy-50 rounded-lg text-sm font-bold transition-colors"
                  >
                    Details
                  </button>
                  {event.isRegistered ? (
                    <button disabled className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-electric-indigo rounded-lg text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Joined
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRegister(event.id)}
                      className="px-3 py-1.5 bg-electric-indigo text-white rounded-lg text-sm font-bold hover:bg-indigo-600 transition-colors shadow-sm"
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden">
              <div className={`h-48 bg-gradient-to-r ${
                selectedEvent.category === 'Academic' ? 'from-blue-500 to-indigo-600' :
                selectedEvent.category === 'Club' ? 'from-purple-500 to-pink-500' : 'from-emerald-400 to-teal-500'
              } relative`}>
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md">
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider mb-2 inline-block">{selectedEvent.category}</span>
                  <h2 className="text-3xl font-extrabold">{selectedEvent.title}</h2>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-6 mb-8 bg-navy-50 p-4 rounded-xl border border-navy-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-electric-indigo shadow-sm border border-navy-100"><Calendar className="w-5 h-5" /></div>
                    <div><p className="text-xs text-navy-500 font-bold uppercase">Date</p><p className="font-semibold text-navy-900">{selectedEvent.date}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-electric-indigo shadow-sm border border-navy-100"><Clock className="w-5 h-5" /></div>
                    <div><p className="text-xs text-navy-500 font-bold uppercase">Time</p><p className="font-semibold text-navy-900">{selectedEvent.time}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-electric-indigo shadow-sm border border-navy-100"><MapPin className="w-5 h-5" /></div>
                    <div><p className="text-xs text-navy-500 font-bold uppercase">Location</p><p className="font-semibold text-navy-900">{selectedEvent.location}</p></div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-navy-900 mb-3">About this Event</h3>
                <p className="text-navy-600 leading-relaxed mb-6">
                  {selectedEvent.description} Join us for an engaging session designed to expand your network and skills. We will cover various topics, have interactive Q&A sessions, and provide refreshments.
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-navy-100">
                  <p className="text-sm font-semibold text-navy-500">
                    <span className="text-navy-900">{selectedEvent.registered}</span> out of {selectedEvent.capacity} spots filled
                  </p>
                  {selectedEvent.isRegistered ? (
                    <button disabled className="flex items-center gap-2 px-6 py-2.5 bg-indigo-50 text-electric-indigo rounded-xl font-bold border border-indigo-100">
                      <CheckCircle2 className="w-5 h-5" /> You are registered
                    </button>
                  ) : (
                    <button onClick={() => handleRegister(selectedEvent.id)} className="px-6 py-2.5 bg-electric-indigo hover:bg-indigo-600 text-white rounded-xl font-bold shadow-sm transition-all">
                      Secure Your Spot
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
