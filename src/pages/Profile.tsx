import React from 'react';
import { useAppContext } from '../store/AppContext';
import { Mail, Briefcase, GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

export default function Profile() {
  const { user } = useAppContext();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-electric-indigo to-navy-900 relative">
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8 relative">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg absolute -top-16 bg-navy-50"
          />
          <div className="pt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-navy-900">{user.name}</h1>
              <p className="text-navy-500 font-medium capitalize mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-green"></span>
                {user.role} Account
              </p>
            </div>
            <button className="px-5 py-2 bg-navy-100 text-navy-700 hover:bg-navy-200 rounded-lg font-bold transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-2">Contact & Info</h3>
              <div className="flex items-center gap-3 text-navy-700">
                <Mail className="w-5 h-5 text-navy-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-navy-700">
                {user.role === 'student' ? (
                  <GraduationCap className="w-5 h-5 text-navy-400" />
                ) : (
                  <Briefcase className="w-5 h-5 text-navy-400" />
                )}
                <span>{user.role === 'student' ? 'Computer Science Engineering (Year 3)' : 'Department of Computer Science'}</span>
              </div>
              <div className="flex items-center gap-3 text-navy-700">
                <MapPin className="w-5 h-5 text-navy-400" />
                <span>Campus 6, Academic Block</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-2">Activity Summary</h3>
              <div className="flex items-center gap-3 text-navy-700">
                <Calendar className="w-5 h-5 text-navy-400" />
                <span>Joined August 2024</span>
              </div>
              <div className="flex items-center gap-3 text-navy-700">
                <Award className="w-5 h-5 text-navy-400" />
                <span>{user.role === 'student' ? '12 Events Attended' : '5 Events Organized'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
