import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { MOCK_STUDENT_CLASSES, MOCK_LIBRARY, MOCK_NOTIFICATIONS } from '../data/mockData';
import { MapPin, Clock, Library, Navigation, Calendar, Cloud, ArrowRight, Ticket, Wrench, SearchIcon, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const { user, events } = useAppContext();
  const navigate = useNavigate();

  const nextClass = MOCK_STUDENT_CLASSES.find(c => c.status === 'upcoming');
  const upcomingEvents = events.filter(e => e.isRegistered).slice(0, 3);
  const libraryPercentage = Math.round((MOCK_LIBRARY.occupied / MOCK_LIBRARY.total) * 100);
  const availableSeats = MOCK_LIBRARY.total - MOCK_LIBRARY.occupied;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-navy-900 tracking-tight">
          Good afternoon, {user?.name.split(' ')[0]} <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-bottom-right">👋</span>
        </h1>
        <p className="text-navy-500 mt-1">Here's what's happening across your campus today.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Next Class */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-electric-indigo to-navy-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Clock className="w-24 h-24" />
          </div>
          <p className="text-sm font-semibold tracking-wider text-white/80 uppercase mb-4">Next Class</p>
          {nextClass ? (
            <>
              <h2 className="text-3xl font-bold mb-1">{nextClass.subject}</h2>
              <p className="text-white/80 mb-6">{nextClass.duration}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-white/70" />
                <span>{nextClass.campus} · {nextClass.room}</span>
              </div>
              <div className="flex items-center justify-between mt-8">
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                  Starts in 42 min
                </div>
                <button 
                  onClick={() => navigate('/student/timetable')}
                  className="bg-white text-electric-indigo hover:bg-navy-50 px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
                >
                  Navigate <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <p>No more classes today!</p>
          )}
        </motion.div>

        {/* Library */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-navy-100 flex flex-col justify-between group hover:border-electric-indigo/30 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold tracking-wider text-navy-400 uppercase">Library</p>
              <Library className="w-5 h-5 text-navy-300 group-hover:text-electric-indigo transition-colors" />
            </div>
            <div className="mb-2">
              <span className="text-4xl font-extrabold text-navy-900">{availableSeats}</span>
              <span className="text-navy-500 ml-2">seats available</span>
            </div>
            <p className="text-sm text-navy-400 mb-4">{MOCK_LIBRARY.occupied} / {MOCK_LIBRARY.total} occupied</p>
            
            <div className="w-full h-3 bg-navy-50 rounded-full overflow-hidden">
              <div className="h-full bg-status-blue rounded-full" style={{ width: `${libraryPercentage}%` }}></div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-navy-50 text-sm font-medium text-navy-600">
            <span className="inline-block w-2 h-2 rounded-full bg-status-green mr-2"></span>
            Quiet zone: {MOCK_LIBRARY.quietZoneOccupancy}% occupied
          </div>
        </motion.div>

        {/* Academic Countdown & Weather (Stacked vertically in a column) */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-navy-100 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold tracking-wider text-status-amber uppercase mb-1">Mid-Semester Exams</p>
              <p className="text-2xl font-bold text-navy-900">12 days</p>
              <p className="text-sm text-navy-500">October 8</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-status-amber">
              <Calendar className="w-6 h-6" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
            className="bg-gradient-to-r from-cyan-500 to-status-blue rounded-2xl p-5 shadow-sm text-white flex justify-between items-center"
          >
            <div>
              <p className="text-3xl font-bold mb-1">28°</p>
              <p className="text-sm text-white/90 font-medium">Partly Cloudy</p>
              <p className="text-xs text-white/70 mt-1">Bhubaneswar · Feels like 30°</p>
            </div>
            <Cloud className="w-12 h-12 text-white/80" />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Upcoming Events */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-sm border border-navy-100 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-navy-900">Your Upcoming Events</h3>
            <button onClick={() => navigate('/student/events')} className="text-sm text-electric-indigo font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy-50 transition-colors group cursor-pointer border border-transparent hover:border-navy-100">
                <div className="w-14 h-14 rounded-lg bg-indigo-50 flex flex-col items-center justify-center flex-shrink-0 border border-indigo-100 text-electric-indigo group-hover:bg-electric-indigo group-hover:text-white transition-colors">
                  <span className="text-xs font-semibold uppercase">{event.date.substring(0, 3)}</span>
                  <span className="text-lg font-bold">25</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-navy-900">{event.title}</h4>
                  <p className="text-sm text-navy-500">{event.time} · {event.venue}</p>
                </div>
                <div className="hidden sm:flex text-sm text-navy-400 items-center gap-1 group-hover:text-electric-indigo transition-colors">
                  Details <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Campus Pulse */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-sm border border-navy-100 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-red animate-pulse"></span>
              Campus Pulse
            </h3>
          </div>
          <div className="space-y-4">
            {MOCK_NOTIFICATIONS.map((notif) => (
              <div key={notif.id} className="border-l-2 border-status-blue pl-4 py-1">
                <h4 className="text-sm font-semibold text-navy-900">{notif.title}</h4>
                <p className="text-xs text-navy-500 mt-1">{notif.message}</p>
                <p className="text-xs text-navy-400 mt-2 font-medium">{notif.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-4 mt-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Find Events', icon: Ticket, href: '/student/events', color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Report Issue', icon: Wrench, href: '/student/fixmycampus', color: 'text-status-red', bg: 'bg-red-50' },
            { label: 'LostLoop', icon: SearchIcon, href: '/student/lostloop', color: 'text-electric-indigo', bg: 'bg-indigo-50' },
            { label: 'Navigate', icon: Navigation, href: '/student/navigator', color: 'text-status-blue', bg: 'bg-blue-50' },
            { label: 'Find Teacher', icon: Users, href: '/student/teachers', color: 'text-status-green', bg: 'bg-green-50' },
            { label: 'Library', icon: Library, href: '/student/univault', color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <button 
                key={i}
                onClick={() => navigate(action.href)}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-navy-100 hover:border-navy-300 hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 rounded-full ${action.bg} ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-navy-700">{action.label}</span>
              </button>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
}
