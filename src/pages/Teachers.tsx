import React, { useState } from 'react';
import { Search, Mail, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Teachers() {
  const [query, setQuery] = useState('');
  
  const teachers = [
    { name: 'Dr. Alan Turing', dept: 'Computer Science', email: 'alan@kaleidos.edu', role: 'Professor' },
    { name: 'Dr. Ada Lovelace', dept: 'Mathematics', email: 'ada@kaleidos.edu', role: 'Associate Professor' },
    { name: 'Prof. Grace Hopper', dept: 'Computer Science', email: 'grace@kaleidos.edu', role: 'Dean' },
    { name: 'Dr. Richard Feynman', dept: 'Physics', email: 'richard@kaleidos.edu', role: 'Professor' }
  ];

  const filtered = teachers.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.dept.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Faculty Directory</h1>
          <p className="text-navy-500 mt-1">Find and contact your professors.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input 
            type="text" 
            placeholder="Search by name or department..." 
            className="w-full pl-9 pr-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t, i) => (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} key={i} className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm hover:border-electric-indigo transition-colors group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-navy-100 flex items-center justify-center text-navy-500 font-bold text-xl">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-navy-900">{t.name}</h3>
                <p className="text-sm text-navy-500">{t.role}</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-navy-600">
                <BookOpen className="w-4 h-4 text-navy-400" /> {t.dept}
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-600">
                <Mail className="w-4 h-4 text-navy-400" /> {t.email}
              </div>
            </div>
            <button className="w-full py-2 bg-navy-50 text-navy-700 font-bold rounded-lg group-hover:bg-electric-indigo group-hover:text-white transition-colors">
              Message
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
