import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { CheckCircle, XCircle, AlertCircle, Calendar, MapPin, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventItem } from '../data/mockData';

export default function AdminEvents() {
  const { events, updateEventStatus } = useAppContext();
  const [activeTab, setActiveTab] = useState<'Pending Approval' | 'Published'>('Pending Approval');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [feedback, setFeedback] = useState('');

  const filteredEvents = events.filter(e => e.status === activeTab);

  const handleApprove = (id: string) => {
    updateEventStatus(id, 'Published');
    setSelectedEvent(null);
  };

  const handleRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvent) {
      updateEventStatus(selectedEvent.id, 'Changes Requested', feedback);
      setSelectedEvent(null);
      setFeedback('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Event Approval Center</h1>
          <p className="text-navy-500 mt-1">Review and manage university-wide event requests.</p>
        </div>
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-200 font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {events.filter(e => e.status === 'Pending Approval').length} Events Awaiting Approval
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-navy-100 rounded-xl w-max mb-6">
        {['Pending Approval', 'Published'].map(tab => (
          <button 
            key={tab}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-900'
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredEvents.map((event, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
              key={event.id} 
              className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden flex flex-col group hover:border-electric-indigo transition-colors"
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-1 bg-navy-50 text-navy-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-navy-200">
                    {event.category}
                  </span>
                  <span className="text-xs font-semibold text-navy-400">By {event.organizer}</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{event.title}</h3>
                <p className="text-sm text-navy-500 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-navy-600">
                    <Calendar className="w-4 h-4 opacity-60" /> {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-navy-600">
                    <MapPin className="w-4 h-4 opacity-60" /> {event.venue}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-navy-600">
                    <Ticket className="w-4 h-4 opacity-60" /> Cap: {event.capacity}
                  </div>
                </div>

                <div className="mt-auto">
                  {event.status === 'Pending Approval' ? (
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="w-full py-2.5 bg-electric-indigo text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
                    >
                      Review Event
                    </button>
                  ) : (
                    <button className="w-full py-2 bg-navy-50 text-navy-400 font-bold rounded-lg cursor-not-allowed">
                      Published
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-navy-400">
              <CheckCircle className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-semibold text-lg text-navy-700">No events {activeTab.toLowerCase()}.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 overflow-hidden">
              <div className="p-6 border-b border-navy-100 flex justify-between items-center bg-navy-50">
                <h2 className="text-xl font-bold text-navy-900">Review: {selectedEvent.title}</h2>
                <button onClick={() => setSelectedEvent(null)} className="text-navy-400 hover:text-navy-900"><XCircle className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-navy-50 p-4 rounded-xl border border-navy-100">
                  <p className="text-sm text-navy-600 font-semibold mb-1">Description</p>
                  <p className="text-navy-900">{selectedEvent.description}</p>
                </div>
                <form onSubmit={handleRequestChanges} className="space-y-4 pt-4 border-t border-navy-100">
                  <div>
                    <label className="text-sm font-semibold text-navy-700 block mb-1">Request Changes (Optional)</label>
                    <textarea 
                      value={feedback} 
                      onChange={e => setFeedback(e.target.value)} 
                      placeholder="e.g., Please change the venue capacity..." 
                      className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-status-red focus:ring-1 focus:ring-status-red" 
                      rows={3} 
                    />
                  </div>
                  <div className="flex gap-3">
                    <button 
                      type="submit" 
                      disabled={!feedback}
                      className="flex-1 py-2.5 bg-red-50 text-status-red font-bold rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Request Changes
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleApprove(selectedEvent.id)}
                      className="flex-1 py-2.5 bg-status-green text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                    >
                      Approve Event
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
