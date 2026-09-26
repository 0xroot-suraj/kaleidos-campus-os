import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Plus, Package, MapPin, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LostLoop() {
  const { user, lostItems, addLostItem, updateItemStatus } = useAppContext();
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'lost' | 'found'>('lost');
  
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Electronics',
    location: '',
    description: ''
  });

  const filteredItems = lostItems.filter(item => item.type === activeTab && item.status !== 'Resolved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLostItem({
      id: `LL-${Math.floor(Math.random() * 900) + 100}`,
      item: newItem.title,
      title: newItem.title,
      description: newItem.description || 'No description provided.',
      type: modalType,
      category: newItem.category,
      location: newItem.location,
      date: 'Just now',
      status: 'Active',
      contact: user?.name || 'User'
    });
    setIsModalOpen(false);
    setNewItem({ title: '', category: 'Electronics', location: '', description: '' });
  };

  const handleStatusUpdate = (id: string) => {
    updateItemStatus(id, 'Resolved');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">LostLoop</h1>
          <p className="text-navy-500 mt-1">Lost it? Found it? List it here.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => { setModalType('lost'); setIsModalOpen(true); }}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2.5 bg-status-red hover:bg-red-700 text-white rounded-xl font-bold shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" />
            Report Lost
          </button>
          <button 
            onClick={() => { setModalType('found'); setIsModalOpen(true); }}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2.5 bg-status-green hover:bg-green-700 text-white rounded-xl font-bold shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" />
            Report Found
          </button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-navy-100 rounded-xl w-max mb-6">
        <button 
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'lost' ? 'bg-white text-status-red shadow-sm' : 'text-navy-500 hover:text-navy-900'
          }`}
          onClick={() => setActiveTab('lost')}
        >
          Lost Items
        </button>
        <button 
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'found' ? 'bg-white text-status-green shadow-sm' : 'text-navy-500 hover:text-navy-900'
          }`}
          onClick={() => setActiveTab('found')}
        >
          Found Items
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              key={item.id} 
              className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm flex flex-col hover:border-electric-indigo transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${
                  item.type === 'lost' ? 'bg-red-50 text-status-red' : 'bg-green-50 text-status-green'
                }`}>
                  <Package className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-navy-50 text-navy-500 rounded-full border border-navy-200">
                  {item.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-navy-900 mb-4">{item.title}</h3>
              
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-navy-600 font-medium">
                  <MapPin className="w-4 h-4 text-navy-400" />
                  {item.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600 font-medium">
                  <Calendar className="w-4 h-4 text-navy-400" />
                  {item.date}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-electric-indigo text-white flex items-center justify-center text-xs font-bold">
                    {item.contact[0]}
                  </div>
                  <span className="text-xs font-semibold text-navy-500">{item.contact}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 mt-4 border-t border-navy-50">
                <button onClick={() => alert("Contact info for " + item.contact + " copied to clipboard! (Mock)")} className="flex-1 py-2 bg-navy-100 text-navy-700 hover:bg-navy-200 rounded-lg text-sm font-bold transition-colors">
                  Contact
                </button>
                {user?.role === 'staff' || user?.role === 'admin' ? (
                  <button 
                    onClick={() => handleStatusUpdate(item.id)}
                    className="px-4 py-2 bg-status-green text-white font-bold rounded-lg text-sm hover:bg-green-600 transition-colors shadow-sm"
                  >
                    Resolve
                  </button>
                ) : null}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-navy-400">
            <Package className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-semibold text-lg text-navy-700">No {activeTab} items right now.</p>
          </div>
        )}
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 overflow-hidden">
              <div className={`p-6 border-b border-navy-100 flex justify-between items-center ${modalType === 'lost' ? 'bg-red-50' : 'bg-green-50'}`}>
                <h2 className={`text-xl font-bold ${modalType === 'lost' ? 'text-status-red' : 'text-status-green'}`}>
                  Report {modalType === 'lost' ? 'Lost' : 'Found'} Item
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-navy-400 hover:text-navy-900"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1">Item Title</label>
                  <input type="text" required value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" placeholder="e.g. Blue Hydroflask" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">Category</label>
                    <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo bg-white">
                      <option>Electronics</option><option>Clothing</option><option>Accessories</option><option>Books</option><option>ID/Wallet</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">Location {modalType === 'lost' ? 'Lost' : 'Found'}</label>
                    <input type="text" required value={newItem.location} onChange={e => setNewItem({...newItem, location: e.target.value})} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" placeholder="e.g. Library 2nd Floor" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-navy-600 font-bold hover:bg-navy-50 rounded-lg">Cancel</button>
                  <button type="submit" className={`px-5 py-2 text-white font-bold rounded-lg ${modalType === 'lost' ? 'bg-status-red hover:bg-red-700' : 'bg-status-green hover:bg-green-700'}`}>
                    Submit Report
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
