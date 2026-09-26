import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { X, Plus, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventStatus, EventItem } from '../data/mockData';

export default function StaffEvents() {
  const { events, createEvent, updateEventStatus } = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Published'>('All');
  
  const [newEvent, setNewEvent] = useState({ 
    title: '', description: '', location: '', date: '', time: '', category: 'Academic', capacity: 50 
  });

  const filteredEvents = events.filter(e => {
    if (activeTab === 'Pending') return e.status === 'Pending Approval' || e.status === 'Changes Requested';
    if (activeTab === 'Published') return e.status === 'Published';
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent({
      id: `evt_${Date.now()}`,
      title: newEvent.title,
      organizer: 'Staff Member',
      date: newEvent.date,
      time: newEvent.time,
      venue: newEvent.location,
      location: newEvent.location,
      description: newEvent.description,
      category: newEvent.category,
      capacity: newEvent.capacity,
      registered: 0,
      isRegistered: false,
      status: 'Pending Approval'
    });
    setIsCreateOpen(false);
    setNewEvent({ title: '', description: '', location: '', date: '', time: '', category: 'Academic', capacity: 50 });
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'Published': return <span className="bg-green-100 text-status-green px-2 py-1 rounded-md text-xs font-bold">Published</span>;
      case 'Pending Approval': return <span className="bg-amber-100 text-status-amber px-2 py-1 rounded-md text-xs font-bold">Pending Review</span>;
      case 'Changes Requested': return <span className="bg-red-100 text-status-red px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Action Required</span>;
      case 'Completed': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">Completed</span>;
      default: return <span className="bg-navy-100 text-navy-700 px-2 py-1 rounded-md text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Event Organizer Console</h1>
          <p className="text-navy-500 mt-1">Create, manage, and submit events for approval.</p>
        </div>
        <button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-electric-indigo hover:bg-indigo-600 text-white rounded-xl font-bold shadow-sm transition-colors">
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-navy-100 rounded-xl w-max mb-6">
        {['All', 'Pending', 'Published'].map(tab => (
          <button 
            key={tab}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-900'
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab} Events
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, i) => (
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
              <div className="relative flex justify-between items-start">
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold uppercase tracking-wider">
                  {event.category}
                </span>
                {getStatusBadge(event.status)}
              </div>
              <div className="relative text-white">
                <p className="text-2xl font-black">{event.date}</p>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-navy-900 mb-2">{event.title}</h3>
              <p className="text-sm text-navy-500 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-navy-50">
                <div className="text-sm text-navy-500 font-medium">
                  <span className="text-electric-indigo font-bold">{event.registered}</span> / {event.capacity} registered
                </div>
                <button 
                  onClick={() => setSelectedEvent(event)}
                  className="px-4 py-2 bg-navy-100 text-navy-700 hover:bg-navy-200 rounded-lg text-sm font-bold transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Manage Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">Manage Event: {selectedEvent.title}</h2>
                  <div className="mt-2">{getStatusBadge(selectedEvent.status)}</div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-navy-400 hover:text-navy-900"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                {selectedEvent.status === 'Changes Requested' && (
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-status-red flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-status-red uppercase">Admin Feedback</p>
                      <p className="text-sm text-red-900 mt-1">{selectedEvent.feedback}</p>
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-navy-50 rounded-xl border border-navy-100">
                  <p className="text-sm font-semibold text-navy-500 uppercase tracking-wider mb-1">Registrations</p>
                  <p className="text-2xl font-bold text-electric-indigo">{selectedEvent.registered} <span className="text-sm text-navy-600">/ {selectedEvent.capacity}</span></p>
                </div>

                {selectedEvent.status === 'Changes Requested' ? (
                  <button 
                    onClick={() => { updateEventStatus(selectedEvent.id, 'Pending Approval'); setSelectedEvent(null); }}
                    className="w-full py-2 bg-status-amber text-white font-bold rounded-lg hover:bg-amber-600 transition-colors flex justify-center items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> Edit & Resubmit
                  </button>
                ) : (
                  <button className="w-full py-2 bg-navy-900 text-white font-bold rounded-lg hover:bg-navy-800 transition-colors">Download Attendee List (CSV)</button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Event Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-navy-900">Create New Event</h2>
                <button onClick={() => setIsCreateOpen(false)} className="text-navy-400 hover:text-navy-900"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-navy-700 block mb-1">Event Title</label>
                  <input type="text" required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy-700 block mb-1">Description</label>
                  <textarea required value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-navy-700 block mb-1">Date</label>
                    <input type="date" required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-navy-700 block mb-1">Time</label>
                    <input type="time" required value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy-700 block mb-1">Location</label>
                  <input type="text" required value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsCreateOpen(false)} className="px-5 py-2 text-navy-600 font-bold hover:bg-navy-50 rounded-lg">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-electric-indigo text-white font-bold rounded-lg hover:bg-indigo-600">Submit for Approval</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
