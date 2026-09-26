import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { 
  Search, Bell, Map, LayoutDashboard, Calendar, 
  GraduationCap, Ticket, SearchIcon, Wrench, Users, 
  MessageSquare, FileBox, Settings, LogOut, Menu, X, Bot, CheckCircle2
} from 'lucide-react';
import CommandPalette from '../components/CommandPalette';
import AIAssistant from '../components/AIAssistant';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppShell() {
  const { user, logout, notifications, markNotificationsRead } = useAppContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const roleNotifications = notifications.filter(n => n.targetRole === 'all' || n.targetRole === user?.role);
  const unreadCount = roleNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdPaletteOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const getNavigation = () => {
    switch (user?.role) {
      case 'student':
        return [
          { name: 'Home', href: '/student', icon: LayoutDashboard },
          { name: 'Timetable', href: '/student/timetable', icon: Calendar },
          { name: 'Academics', href: '/student/academics', icon: GraduationCap },
          { name: 'Events', href: '/student/events', icon: Ticket },
          { name: 'LostLoop', href: '/student/lostloop', icon: SearchIcon },
          { name: 'FixMyCampus', href: '/student/fixmycampus', icon: Wrench },
          { name: 'My Teachers', href: '/student/teachers', icon: Users },
          { name: 'CampusFeed', href: '/student/campusfeed', icon: MessageSquare },
          { name: 'UniVault', href: '/student/univault', icon: FileBox },
        ];
      case 'staff':
        return [
          { name: 'Dashboard', href: '/staff', icon: LayoutDashboard },
          { name: 'My Classes', href: '/staff/classes', icon: Calendar },
          { name: 'Manage Events', href: '/staff/events', icon: Ticket },
          { name: 'Assigned Issues', href: '/staff/issues', icon: Wrench },
          { name: 'Students', href: '/staff/students', icon: Users },
        ];
      case 'admin':
        return [
          { name: 'Overview', href: '/admin', icon: LayoutDashboard },
          { name: 'Users', href: '/admin/users', icon: Users },
          { name: 'Events', href: '/admin/events', icon: Ticket },
          { name: 'Issues', href: '/admin/issues', icon: Wrench },
          { name: 'Facilities', href: '/admin/facilities', icon: Map },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavigation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-navy-50 overflow-hidden font-sans relative">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 bg-white border-r border-navy-100 lg:flex lg:flex-col justify-between relative z-10">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 text-navy-900">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-electric-indigo">
              <Map className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">KALÉIDOS</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href.split('/').length === 2}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-electric-indigo/10 text-electric-indigo'
                        : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-navy-100">
          <button 
            onClick={() => setIsAIOpen(true)}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-600 hover:bg-electric-indigo/10 hover:text-electric-indigo transition-colors mb-2"
          >
            <Bot className="h-5 w-5" />
            Ask KALÉIDOS
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-600 hover:bg-navy-50 hover:text-navy-900 transition-colors mb-2"
          >
            <Settings className="h-5 w-5" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between bg-white px-6 border-b border-navy-100 relative z-20">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-navy-600 hover:text-navy-900"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div 
              onClick={() => setIsCmdPaletteOpen(true)}
              className="hidden md:flex items-center gap-2 bg-navy-50 text-navy-400 px-3 py-1.5 rounded-lg border border-navy-100 hover:border-navy-300 transition-colors cursor-pointer w-64 lg:w-96"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Search or jump to... (Cmd/Ctrl + K)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-navy-600 hover:bg-navy-50 rounded-full transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-status-red ring-2 ring-white"></span>}
              </button>
              
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-navy-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-navy-100 flex justify-between items-center bg-navy-50">
                      <h3 className="font-bold text-navy-900">Notifications</h3>
                      <button onClick={markNotificationsRead} className="text-xs text-electric-indigo font-semibold hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {roleNotifications.length > 0 ? roleNotifications.map((n) => (
                        <div key={n.id} className={`p-4 border-b border-navy-100 hover:bg-navy-50 cursor-pointer ${!n.read ? 'bg-indigo-50/30' : ''}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-navy-900">{n.title}</h4>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-electric-indigo"></span>}
                          </div>
                          <p className="text-xs text-navy-500 mt-1">{n.message}</p>
                          <p className="text-[10px] text-navy-400 mt-2">{n.time}</p>
                        </div>
                      )) : (
                        <div className="p-8 text-center text-navy-500 text-sm">No new notifications.</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-3 border-l border-navy-100 pl-4">
              <button 
                onClick={() => navigate(`/${user?.role}/profile`)}
                className="flex items-center gap-3 hover:bg-navy-50 p-1.5 rounded-lg transition-colors text-left"
                title="View Profile"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-navy-900">{user?.name}</p>
                  <p className="text-xs text-navy-500 capitalize">{user?.role}</p>
                </div>
                <img 
                  src={user?.avatar} 
                  alt="Avatar" 
                  className="h-9 w-9 rounded-full border border-navy-200"
                />
              </button>
              <button 
                onClick={handleLogout}
                className="p-1.5 text-navy-400 hover:text-status-red rounded-lg hover:bg-red-50 transition-colors"
                title="Log out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-navy-50 relative z-10">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Button (visible when closed) */}
      {!isAIOpen && (
        <button 
          onClick={() => setIsAIOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-electric-indigo text-white p-4 rounded-full shadow-lg hover:bg-indigo-600 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
              <div className="bg-navy-50 w-full md:w-1/3 p-4 border-r border-navy-100 flex flex-col gap-2">
                <h3 className="font-bold text-navy-900 px-3 py-2 text-lg">Settings</h3>
                <button className="text-left px-3 py-2 bg-electric-indigo/10 text-electric-indigo rounded-lg font-semibold text-sm">Account</button>
                <button className="text-left px-3 py-2 hover:bg-navy-100 text-navy-600 rounded-lg font-semibold text-sm transition-colors">Notifications</button>
                <button className="text-left px-3 py-2 hover:bg-navy-100 text-navy-600 rounded-lg font-semibold text-sm transition-colors">Appearance</button>
                <button className="text-left px-3 py-2 hover:bg-navy-100 text-navy-600 rounded-lg font-semibold text-sm transition-colors">Privacy</button>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-navy-900">Account Preferences</h2>
                  <button onClick={() => setIsSettingsOpen(false)} className="text-navy-400 hover:text-navy-900"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-navy-700 block mb-1">Display Name</label>
                    <input type="text" defaultValue={user?.name} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-navy-700 block mb-1">Email</label>
                    <input type="email" defaultValue={user?.email} className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-electric-indigo" />
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-navy-900">Two-Factor Authentication</p>
                      <p className="text-xs text-navy-500">Add an extra layer of security.</p>
                    </div>
                    <button className="px-4 py-1.5 bg-green-50 text-status-green border border-green-200 rounded-lg text-sm font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Enabled
                    </button>
                  </div>
                </div>
                <div className="mt-auto pt-6 flex justify-end">
                  <button onClick={() => setIsSettingsOpen(false)} className="px-5 py-2 bg-navy-900 text-white font-bold rounded-lg hover:bg-navy-800 transition-colors">Save Changes</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col justify-between animate-[slide-in_0.2s_ease-out]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-navy-900">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-electric-indigo">
                    <Map className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">KALÉIDOS</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-navy-400 hover:text-navy-900"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      end={item.href.split('/').length === 2}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-electric-indigo/10 text-electric-indigo'
                            : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
            
            <div className="p-6 border-t border-navy-100">
              <button 
                onClick={() => { setIsAIOpen(true); setIsMobileMenuOpen(false); }}
                className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-electric-indigo bg-electric-indigo/5 mb-2"
              >
                <Bot className="h-5 w-5" />
                Ask KALÉIDOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
