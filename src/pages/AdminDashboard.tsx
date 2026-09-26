import { Users, Ticket, Wrench, Building2, Activity, Map, AlertTriangle } from 'lucide-react';
import { MOCK_CAMPUS_METRICS, MOCK_TICKETS } from '../data/mockData';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const metrics = [
    { label: 'Total Students', value: MOCK_CAMPUS_METRICS.students, icon: Users, color: 'bg-blue-500' },
    { label: 'Faculty & Staff', value: MOCK_CAMPUS_METRICS.staff, icon: Users, color: 'bg-indigo-500' },
    { label: 'Active Events', value: MOCK_CAMPUS_METRICS.activeEvents, icon: Ticket, color: 'bg-purple-500' },
    { label: 'Open Issues', value: MOCK_CAMPUS_METRICS.openIssues, icon: Wrench, color: 'bg-red-500' },
    { label: 'Library Visitors', value: MOCK_CAMPUS_METRICS.libraryVisitors, icon: Building2, color: 'bg-teal-500' },
    { label: 'Campus Health', value: `${MOCK_CAMPUS_METRICS.campusHealth}%`, icon: Activity, color: 'bg-emerald-500' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Campus Operations Center</h1>
        <p className="text-navy-500 mt-1">Real-time overview of university activity and governance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={metric.label} 
              className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm flex items-center gap-4 hover:border-electric-indigo transition-colors"
            >
              <div className={`p-4 rounded-xl text-white ${metric.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-500">{metric.label}</p>
                <p className="text-2xl font-black text-navy-900">{metric.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-navy-100 flex justify-between items-center bg-navy-50">
            <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2"><Map className="w-5 h-5 text-electric-indigo"/> Campus Pulse</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-navy-50 rounded-xl p-4 border border-navy-100">
              <p className="text-sm font-bold text-navy-600 mb-2">CAMPUS 6</p>
              <div className="space-y-2 text-sm text-navy-900">
                <div className="flex justify-between"><span>Occupancy</span><span className="font-bold">72%</span></div>
                <div className="flex justify-between"><span>Open Issues</span><span className="font-bold text-status-red">3</span></div>
                <div className="flex justify-between"><span>Wi-Fi</span><span className="font-bold text-status-green">Operational</span></div>
              </div>
            </div>
            <div className="bg-navy-50 rounded-xl p-4 border border-navy-100">
              <p className="text-sm font-bold text-navy-600 mb-2">LIBRARY</p>
              <div className="space-y-2 text-sm text-navy-900">
                <div className="flex justify-between"><span>Occupancy</span><span className="font-bold">71%</span></div>
                <div className="flex justify-between"><span>Quiet Zones</span><span className="font-bold text-status-amber">Full</span></div>
                <div className="flex justify-between"><span>AC</span><span className="font-bold text-status-green">Operational</span></div>
              </div>
            </div>
            <div className="bg-navy-50 rounded-xl p-4 border border-navy-100">
              <p className="text-sm font-bold text-navy-600 mb-2">SPORTS COMPLEX</p>
              <div className="space-y-2 text-sm text-navy-900">
                <div className="flex justify-between"><span>Events Today</span><span className="font-bold">2</span></div>
                <div className="flex justify-between"><span>Power</span><span className="font-bold text-status-green">Operational</span></div>
              </div>
            </div>
            <div className="bg-navy-50 rounded-xl p-4 border border-navy-100">
              <p className="text-sm font-bold text-navy-600 mb-2">CAMPUS 3</p>
              <div className="space-y-2 text-sm text-navy-900">
                <div className="flex justify-between"><span>Open Issues</span><span className="font-bold text-status-amber">1</span></div>
                <div className="flex justify-between"><span>Wi-Fi</span><span className="font-bold text-status-amber">Warning</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-navy-100 flex justify-between items-center bg-red-50">
            <h2 className="text-xl font-bold text-status-red flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Incident Center</h2>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {MOCK_TICKETS.slice(0, 4).map(ticket => (
                <div key={ticket.id} className="border-l-4 border-status-red pl-4 py-2">
                  <h4 className="text-sm font-bold text-navy-900">{ticket.title}</h4>
                  <p className="text-xs text-navy-500">{ticket.location}</p>
                  <p className="text-xs text-status-red font-semibold mt-1">{ticket.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
