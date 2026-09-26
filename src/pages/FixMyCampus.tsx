import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Ticket } from '../data/mockData';
import { Plus, Search, Filter, Wrench, X, MessageSquare, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FixMyCampus() {
  const { user, tickets, addTicket, updateTicketStatus } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicket, setNewTicket] = useState({ title: '', category: 'General', location: '', priority: 'Medium' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reported': return 'bg-navy-100 text-navy-700 border-navy-200';
      case 'Assigned': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress': return 'bg-amber-50 text-status-amber border-amber-200';
      case 'Resolved': return 'bg-green-50 text-status-green border-green-200';
      default: return 'bg-navy-50 text-navy-700 border-navy-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-status-red';
      case 'Medium': return 'text-status-amber';
      case 'Low': return 'text-status-green';
      default: return 'text-navy-500';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.location) return;
    
    addTicket({
      id: `FM-${Math.floor(Math.random() * 900) + 100}`,
      title: newTicket.title,
      category: newTicket.category,
      location: newTicket.location,
      priority: newTicket.priority as 'Low'|'Medium'|'High',
      status: 'Reported',
      date: 'Just now'
    });
    setIsModalOpen(false);
    setNewTicket({ title: '', category: 'General', location: '', priority: 'Medium' });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Wrench className="w-8 h-8 text-status-red" />
            <h1 className="text-3xl font-bold text-navy-900 tracking-tight">FixMyCampus</h1>
          </div>
          <p className="text-navy-500 mt-1">See it. Report it. Fix it.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-status-red hover:bg-red-700 text-white rounded-xl font-bold shadow-sm transition-colors"
        >
          <Plus className="w-5 h-5" />
          Report Issue
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
        <div className="p-4 border-b border-navy-100 bg-navy-50/50 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 focus:outline-none focus:border-electric-indigo bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-navy-200 rounded-lg text-sm text-navy-700 hover:bg-navy-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="divide-y divide-navy-100">
          {tickets.map((ticket, i) => (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              key={ticket.id} 
              onClick={() => setSelectedTicket(ticket)}
              className="p-5 hover:bg-navy-50 transition-colors group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold font-mono text-navy-400">#{ticket.id}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-electric-indigo transition-colors">{ticket.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-navy-500">
                    <span>{ticket.location}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{ticket.category}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{ticket.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">Priority</p>
                    <p className={`text-sm font-bold ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-navy-200 flex items-center justify-center bg-white group-hover:border-electric-indigo group-hover:text-electric-indigo transition-colors">
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </div>
              
              {ticket.status === 'In Progress' && (
                <div className="mt-6 pt-4 border-t border-navy-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-navy-400 mb-2">
                    <span className="text-status-green">Reported</span>
                    <span className="text-status-green">Assigned</span>
                    <span className="text-electric-indigo">In Progress</span>
                    <span>Resolved</span>
                  </div>
                  <div className="w-full h-1.5 bg-navy-100 rounded-full overflow-hidden">
                    <div className="h-full bg-electric-indigo w-2/3 rounded-full"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ticket Details Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setSelectedTicket(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-navy-100 flex justify-between items-start bg-navy-50/50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold font-mono text-navy-500">#{selectedTicket.id}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(selectedTicket.status)}`}>{selectedTicket.status}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getPriorityColor(selectedTicket.priority).replace('text-', 'bg-').replace('500', '50')} ${getPriorityColor(selectedTicket.priority)} border-current`}>{selectedTicket.priority} Priority</span>
                  </div>
                  <h2 className="text-2xl font-bold text-navy-900">{selectedTicket.title}</h2>
                  <p className="text-sm text-navy-500 mt-2">Reported {selectedTicket.date} • {selectedTicket.location}</p>
                </div>
                <button onClick={() => setSelectedTicket(null)} className="p-2 text-navy-400 hover:text-navy-900 hover:bg-navy-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-3">Issue Description</h3>
                <p className="text-navy-700 leading-relaxed mb-6">This issue was automatically categorized under "{selectedTicket.category}". A maintenance staff member will be assigned shortly. Please provide any updates if the situation worsens.</p>
                
                <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-3">Attached Media</h3>
                <div className="w-48 h-32 bg-navy-50 border-2 border-dashed border-navy-200 rounded-xl flex flex-col items-center justify-center text-navy-400 mb-6">
                  <Camera className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs font-semibold">No photos attached</span>
                </div>

                <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-3">Activity Log</h3>
                <div className="space-y-4 relative pl-4 border-l-2 border-navy-100">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-white border-2 border-electric-indigo"></div>
                    <p className="text-sm font-bold text-navy-900">Ticket Created</p>
                    <p className="text-xs text-navy-500">{selectedTicket.date}</p>
                  </div>
                  {selectedTicket.status !== 'Reported' && (
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-white border-2 border-electric-indigo"></div>
                      <p className="text-sm font-bold text-navy-900">Assigned to Maintenance Team</p>
                      <p className="text-xs text-navy-500">Shortly after reporting</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-navy-100 bg-navy-50 flex gap-3">
                <input type="text" placeholder="Add a comment..." className="flex-1 px-4 py-2 bg-white border border-navy-200 rounded-xl focus:outline-none focus:border-electric-indigo" />
                <button className="p-2 bg-electric-indigo text-white rounded-xl hover:bg-indigo-600"><MessageSquare className="w-5 h-5" /></button>
                {(user?.role === 'staff' || user?.role === 'admin') && selectedTicket.status !== 'Resolved' && (
                  <div className="flex gap-2">
                    {selectedTicket.status === 'Reported' && (
                      <button onClick={() => { updateTicketStatus(selectedTicket.id, 'In Progress'); setSelectedTicket({...selectedTicket, status: 'In Progress'}); }} className="px-4 py-2 bg-electric-indigo text-white font-bold rounded-xl hover:bg-indigo-600">Mark In Progress</button>
                    )}
                    {(selectedTicket.status === 'Reported' || selectedTicket.status === 'In Progress') && (
                      <button onClick={() => { updateTicketStatus(selectedTicket.id, 'Resolved'); setSelectedTicket(null); }} className="px-4 py-2 bg-status-green text-white font-bold rounded-xl hover:bg-green-600">Mark Resolved</button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Report Issue Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 overflow-hidden">
              <div className="p-6 border-b border-navy-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-navy-900">Report Campus Issue</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-navy-400 hover:text-navy-900"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1">Issue Title</label>
                  <input type="text" required value={newTicket.title} onChange={e => setNewTicket({...newTicket, title: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-status-red" placeholder="e.g. Broken AC in Lab 3" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">Category</label>
                    <select value={newTicket.category} onChange={e => setNewTicket({...newTicket, category: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-status-red bg-white">
                      <option>Wi-Fi</option><option>AC</option><option>Projector</option><option>Furniture</option><option>Cleanliness</option><option>General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">Priority</label>
                    <select value={newTicket.priority} onChange={e => setNewTicket({...newTicket, priority: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-status-red bg-white">
                      <option>Low</option><option>Medium</option><option>High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1">Location</label>
                  <input type="text" required value={newTicket.location} onChange={e => setNewTicket({...newTicket, location: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-status-red" placeholder="e.g. Campus 3, 2nd Floor" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-navy-600 font-bold hover:bg-navy-50 rounded-lg">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-status-red text-white font-bold rounded-lg hover:bg-red-700">Submit Report</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
