import { useState } from 'react';
import { Search, Mail, Shield, ShieldAlert, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UsersList({ title, subtitle, users }: { title: string, subtitle: string, users: any[] }) {
  const [query, setQuery] = useState('');
  
  const filtered = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">{title}</h1>
          <p className="text-navy-500 mt-1">{subtitle}</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-9 pr-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-navy-50/50 border-b border-navy-100 text-sm text-navy-500 uppercase tracking-wider">
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold hidden md:table-cell">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {filtered.map((u, i) => (
              <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} key={i} className="hover:bg-navy-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt="" className="w-10 h-10 rounded-full border border-navy-200" />
                    <span className="font-bold text-navy-900">{u.name}</span>
                  </div>
                </td>
                <td className="p-4 text-navy-600 hidden md:table-cell">{u.email}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    u.role === 'admin' ? 'bg-purple-50 text-purple-700' :
                    u.role === 'staff' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {u.role === 'admin' ? <ShieldAlert className="w-3 h-3" /> : u.role === 'staff' ? <Shield className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                    <span className="capitalize">{u.role}</span>
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-navy-400 hover:text-electric-indigo rounded-lg hover:bg-indigo-50">
                    <Mail className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
