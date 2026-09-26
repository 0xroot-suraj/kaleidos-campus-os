import React from 'react';
import { Book, Award, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Academics() {
  const courses = [
    { name: 'Data Structures and Algorithms', code: 'CS301', grade: 'A-', attendance: 92 },
    { name: 'Database Management Systems', code: 'CS302', grade: 'B+', attendance: 88 },
    { name: 'Operating Systems', code: 'CS303', grade: 'A', attendance: 95 },
    { name: 'Computer Networks', code: 'CS304', grade: 'A-', attendance: 90 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Academics Overview</h1>
        <p className="text-navy-500 mt-1">Track your progress and coursework.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-electric-indigo rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-500">Current CGPA</p>
            <p className="text-2xl font-bold text-navy-900">3.82</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-status-green rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-500">Avg. Attendance</p>
            <p className="text-2xl font-bold text-navy-900">91%</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-status-amber rounded-xl">
            <Book className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-500">Total Credits</p>
            <p className="text-2xl font-bold text-navy-900">84 / 120</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden mt-8">
        <div className="p-6 border-b border-navy-100 flex justify-between items-center bg-navy-50/50">
          <h2 className="text-lg font-bold text-navy-900">Current Semester</h2>
          <button className="text-sm font-bold text-electric-indigo hover:text-indigo-700">Download Transcript</button>
        </div>
        <div className="divide-y divide-navy-100">
          {courses.map((course, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-navy-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-navy-100 text-navy-600 rounded-xl flex items-center justify-center font-bold">
                  {course.code.replace('CS', '')}
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">{course.name}</h3>
                  <p className="text-sm text-navy-500">{course.code}</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase">Grade</p>
                  <p className="font-bold text-navy-900">{course.grade}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-400 uppercase">Attendance</p>
                  <p className="font-bold text-navy-900">{course.attendance}%</p>
                </div>
                <button className="p-2 text-navy-400 hover:text-electric-indigo rounded-lg hover:bg-indigo-50">
                  <FileText className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
