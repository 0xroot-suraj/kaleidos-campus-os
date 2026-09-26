import { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, User, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../store/AppContext';

export default function Timetable() {
  const { user } = useAppContext();
  const [view, setView] = useState<'Day' | 'Week'>('Day');
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const scheduleData: Record<string, any[]> = {
    'Monday': [
      { id: '1', courseCode: 'CS301', courseName: 'Data Structures and Algorithms', type: 'Lecture', time: '09:00 AM - 10:30 AM', location: 'Room 402, Building A', professor: 'Dr. Alan Turing' },
      { id: '2', courseCode: 'CS301-L', courseName: 'DSA Lab', type: 'Lab', time: '11:00 AM - 01:00 PM', location: 'Computer Lab 3', professor: 'Dr. Alan Turing' }
    ],
    'Tuesday': [
      { id: '3', courseCode: 'MA204', courseName: 'Discrete Mathematics', type: 'Lecture', time: '10:00 AM - 11:30 AM', location: 'Lecture Hall 1', professor: 'Prof. John von Neumann' },
      { id: '4', courseCode: 'HU101', courseName: 'Communication Skills', type: 'Seminar', time: '02:00 PM - 03:30 PM', location: 'Room 205, Building B', professor: 'Dr. Grace Hopper' }
    ],
    'Wednesday': [
      { id: '5', courseCode: 'CS301', courseName: 'Data Structures and Algorithms', type: 'Lecture', time: '09:00 AM - 10:30 AM', location: 'Room 402, Building A', professor: 'Dr. Alan Turing' },
      { id: '6', courseCode: 'CS302', courseName: 'Database Systems', type: 'Lecture', time: '11:00 AM - 12:30 PM', location: 'Room 304, Building C', professor: 'Dr. Edgar Codd' }
    ],
    'Thursday': [
      { id: '7', courseCode: 'MA204', courseName: 'Discrete Mathematics', type: 'Lecture', time: '10:00 AM - 11:30 AM', location: 'Lecture Hall 1', professor: 'Prof. John von Neumann' },
      { id: '8', courseCode: 'CS302-L', courseName: 'DBMS Lab', type: 'Lab', time: '02:00 PM - 04:00 PM', location: 'Computer Lab 2', professor: 'Dr. Edgar Codd' }
    ],
    'Friday': [
      { id: '9', courseCode: 'CS305', courseName: 'Web Development', type: 'Workshop', time: '10:00 AM - 01:00 PM', location: 'Innovation Hub', professor: 'Dr. Tim Berners-Lee' }
    ],
    'Saturday': [
      { id: '10', courseCode: 'EX101', courseName: 'Hackathon Prep', type: 'Extra-curricular', time: '11:00 AM - 02:00 PM', location: 'Student Center', professor: 'Student Council' }
    ],
    'Sunday': [] // Free day
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case 'Lecture': return 'border-blue-200 bg-blue-50 text-blue-900 hover:border-blue-400';
      case 'Lab': return 'border-purple-200 bg-purple-50 text-purple-900 hover:border-purple-400';
      case 'Seminar': return 'border-amber-200 bg-amber-50 text-amber-900 hover:border-amber-400';
      case 'Workshop': return 'border-emerald-200 bg-emerald-50 text-emerald-900 hover:border-emerald-400';
      default: return 'border-navy-200 bg-navy-50 text-navy-900 hover:border-navy-400';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Lecture': return 'bg-blue-100 text-blue-700';
      case 'Lab': return 'bg-purple-100 text-purple-700';
      case 'Seminar': return 'bg-amber-100 text-amber-700';
      case 'Workshop': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-navy-200 text-navy-700';
    }
  };

  const renderScheduleCard = (classItem: any, index: number) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
      key={classItem.id} 
      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer group ${getCardColor(classItem.type)}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${getBadgeColor(classItem.type)}`}>
          {classItem.type}
        </span>
        <button className="text-current opacity-50 hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <h3 className="text-xl font-bold mb-1 leading-tight">{classItem.courseName}</h3>
      <p className="text-sm font-semibold opacity-75 mb-4">{classItem.courseCode}</p>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4 opacity-60" />
          {classItem.time}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="w-4 h-4 opacity-60" />
          {classItem.location}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <User className="w-4 h-4 opacity-60" />
          {classItem.professor}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900 tracking-tight">
            {user?.role === 'staff' ? 'My Classes' : 'My Timetable'}
          </h1>
          <p className="text-navy-500 mt-1">Manage your academic schedule efficiently.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-navy-100 p-1 rounded-xl">
          <button 
            onClick={() => setView('Day')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'Day' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-900'}`}
          >
            Day View
          </button>
          <button 
            onClick={() => setView('Week')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'Week' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-500 hover:text-navy-900'}`}
          >
            Week View
          </button>
        </div>
      </div>

      {view === 'Day' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
          <div className="p-4 border-b border-navy-100 bg-navy-50/50 flex justify-between items-center">
            <button 
              onClick={() => setCurrentDayIndex(prev => (prev === 0 ? 6 : prev - 1))}
              className="p-2 text-navy-400 hover:text-navy-900 hover:bg-navy-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-navy-900">{days[currentDayIndex]}</h2>
            <button 
              onClick={() => setCurrentDayIndex(prev => (prev === 6 ? 0 : prev + 1))}
              className="p-2 text-navy-400 hover:text-navy-900 hover:bg-navy-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduleData[days[currentDayIndex]].length > 0 ? (
              scheduleData[days[currentDayIndex]].map((item, index) => renderScheduleCard(item, index))
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-navy-400">
                <Calendar className="w-12 h-12 mb-4 opacity-50" />
                <p className="font-semibold">No classes scheduled for {days[currentDayIndex]}.</p>
                <p className="text-sm">Enjoy your day off!</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-x-auto">
          <div className="min-w-[800px] flex p-4 bg-navy-50 border-b border-navy-100">
            {days.slice(0, 5).map(day => (
              <div key={day} className="flex-1 px-4 border-r last:border-r-0 border-navy-200">
                <h3 className="font-bold text-navy-900 text-center">{day}</h3>
              </div>
            ))}
          </div>
          <div className="min-w-[800px] flex p-4 min-h-[400px]">
            {days.slice(0, 5).map(day => (
              <div key={day} className="flex-1 px-2 border-r last:border-r-0 border-navy-100/50 space-y-4">
                {scheduleData[day].map((item, index) => renderScheduleCard(item, index))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
