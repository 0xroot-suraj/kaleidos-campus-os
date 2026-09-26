import { Users, Calendar, Megaphone, FileText, LayoutDashboard } from 'lucide-react';

export default function StaffDashboard() {
  const myClasses = [
    { id: 1, time: '09:00', subject: 'Data Structures', section: 'CSE-A', room: 'Campus 6 · Room 402', students: 62, status: 'current' },
    { id: 2, time: '11:00', subject: 'Algorithms', section: 'CSE-B', room: 'Campus 3 · Room 301', students: 58, status: 'upcoming' },
    { id: 3, time: '14:00', subject: 'Programming Lab', section: 'CSE-A', room: 'Lab 4', students: 60, status: 'upcoming' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Staff Workspace</h1>
        <p className="text-navy-500 mt-1">Manage your classes, students, and operational responsibilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-navy-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Users className="w-6 h-6"/></div>
          <div><p className="text-sm font-semibold text-navy-500">Avg Attendance</p><p className="text-2xl font-black text-navy-900">87%</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl"><FileText className="w-6 h-6"/></div>
          <div><p className="text-sm font-semibold text-navy-500">Assignments Due</p><p className="text-2xl font-black text-navy-900">91%</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-navy-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Calendar className="w-6 h-6"/></div>
          <div><p className="text-sm font-semibold text-navy-500">Upcoming Exams</p><p className="text-2xl font-black text-navy-900">2</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-navy-100 bg-navy-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-electric-indigo"/> Today's Classes</h2>
            </div>
            <div className="divide-y divide-navy-50">
              {myClasses.map((cls) => (
                <div key={cls.id} className={`p-5 flex items-center gap-6 hover:bg-navy-50 transition-colors cursor-pointer ${cls.status === 'current' ? 'bg-indigo-50/50' : ''}`}>
                  <div className="text-center w-16">
                    <p className="text-lg font-black text-navy-900">{cls.time}</p>
                    {cls.status === 'current' && <span className="text-[10px] uppercase font-bold text-electric-indigo">Ongoing</span>}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy-900">{cls.subject} <span className="text-sm font-semibold text-navy-400">({cls.section})</span></h3>
                    <p className="text-sm text-navy-500 flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3"/> {cls.students} Students</span>
                      <span>·</span>
                      <span>{cls.room}</span>
                    </p>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-navy-100 text-navy-700 font-bold text-sm rounded-lg hover:bg-navy-200 transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6">
             <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2"><Megaphone className="w-5 h-5 text-electric-indigo"/> Quick Announcement</h2>
             <textarea className="w-full bg-navy-50 border border-navy-200 rounded-xl p-4 focus:outline-none focus:border-electric-indigo" rows={3} placeholder="Type your announcement here..."></textarea>
             <div className="flex justify-between items-center mt-4">
                <select className="bg-navy-50 border border-navy-200 rounded-lg px-3 py-2 text-sm text-navy-700 focus:outline-none">
                  <option>Select Audience</option>
                  <option>CSE-A</option>
                  <option>CSE-B</option>
                  <option>All My Students</option>
                </select>
                <button className="px-5 py-2 bg-electric-indigo text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors">Publish</button>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Class Detail: Data Structures</h2>
            <div className="space-y-4">
              <div className="bg-navy-50 p-4 rounded-xl border border-navy-100">
                <p className="text-xs font-bold text-navy-500 uppercase">Upcoming Exam</p>
                <p className="text-navy-900 font-bold mt-1">Mid-Sem Exam · October 8</p>
              </div>
              <div>
                <p className="text-sm font-bold text-navy-700 mb-2">Resources</p>
                <ul className="space-y-2 text-sm text-navy-600">
                  <li className="flex items-center gap-2"><FileText className="w-4 h-4 text-electric-indigo"/> Unit 1 Notes</li>
                  <li className="flex items-center gap-2"><FileText className="w-4 h-4 text-electric-indigo"/> Trees.pdf</li>
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-navy-700 mb-2">Assignments</p>
                <ul className="space-y-2 text-sm text-navy-600">
                  <li className="flex justify-between bg-navy-50 p-2 rounded-lg"><span>Linked List Impl.</span> <span className="text-status-red text-xs font-bold">Due Oct 3</span></li>
                  <li className="flex justify-between bg-navy-50 p-2 rounded-lg"><span>BST Assignment</span> <span className="text-navy-400 text-xs font-bold">Due Oct 8</span></li>
                </ul>
              </div>
              <button className="w-full mt-2 py-2 bg-navy-100 text-electric-indigo font-bold rounded-lg text-sm hover:bg-navy-200 transition-colors">+ Add Material</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
