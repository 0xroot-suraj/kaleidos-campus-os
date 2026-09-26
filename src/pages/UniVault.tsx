import React from 'react';
import { Folder, FileText, Download, MoreVertical, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UniVault() {
  const files = [
    { name: 'CS301_Midterm_Review.pdf', size: '2.4 MB', date: 'Oct 2, 2024', type: 'pdf' },
    { name: 'Assignment_3_Guidelines.docx', size: '1.1 MB', date: 'Oct 1, 2024', type: 'doc' },
    { name: 'Project_Assets.zip', size: '14.5 MB', date: 'Sep 28, 2024', type: 'zip' },
    { name: 'Lecture_4_Slides.pdf', size: '5.2 MB', date: 'Sep 25, 2024', type: 'pdf' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">UniVault</h1>
          <p className="text-navy-500 mt-1">Your centralized academic drive.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-electric-indigo hover:bg-indigo-600 text-white rounded-xl font-bold shadow-sm transition-colors">
          <UploadCloud className="w-5 h-5" />
          Upload File
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {['My Documents', 'Shared with me', 'Class Materials', 'Archived'].map((folder, i) => (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} key={i} className="bg-white rounded-2xl p-4 border border-navy-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:border-electric-indigo transition-colors cursor-pointer group">
            <Folder className="w-10 h-10 text-navy-300 group-hover:text-electric-indigo transition-colors" />
            <span className="font-semibold text-navy-700 text-sm">{folder}</span>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
        <div className="p-4 border-b border-navy-100 bg-navy-50/50 flex justify-between items-center">
          <h2 className="font-bold text-navy-900">Recent Files</h2>
        </div>
        <div className="divide-y divide-navy-100">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-navy-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-50 text-electric-indigo rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900">{file.name}</h4>
                  <p className="text-xs text-navy-500">{file.size} • Uploaded {file.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-navy-400 hover:text-electric-indigo rounded-lg hover:bg-indigo-50 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-navy-400 hover:text-navy-900 rounded-lg hover:bg-navy-100 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
