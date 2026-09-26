import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import type { Role } from '../data/mockData';
import { Map, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleDemoLogin = (role: Role) => {
    login(role);
    navigate(`/${role}`);
  };

  return (
    <div className="flex h-screen w-full bg-navy-50 overflow-hidden">
      {/* Left side: Immersive Visuals */}
      <div className="relative hidden w-1/2 lg:flex flex-col justify-between p-12 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white overflow-hidden">
        {/* Animated background elements would go here, using CSS or framer motion */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-indigo">
            <Map className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">KALÉIDOS</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            The Intelligent Campus Operating System
          </h1>
          <p className="text-xl text-navy-200 font-medium border-l-4 border-electric-indigo pl-4">
            One campus. One command center. Connect. Discover. Navigate. Participate.
          </p>
        </div>

        {/* Floating Stat Cards */}
        <div className="relative z-10 grid grid-cols-2 gap-4 max-w-lg">
          <div className="rounded-xl bg-white/10 backdrop-blur-md p-4 border border-white/10 shadow-lg animate-[pulse_4s_ease-in-out_infinite]">
            <p className="text-2xl font-bold">173</p>
            <p className="text-sm text-navy-200">Library seats available</p>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur-md p-4 border border-white/10 shadow-lg animate-[pulse_5s_ease-in-out_infinite] delay-75">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-navy-200">Events happening today</p>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8 bg-white relative">
        <div className="absolute top-4 right-4 text-xs font-semibold text-navy-400 bg-navy-50 px-3 py-1 rounded-full flex items-center shadow-sm">
          <span className="w-2 h-2 bg-status-blue rounded-full mr-2 animate-pulse"></span>
          Demo environment
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-navy-900 tracking-tight">Welcome back</h2>
            <p className="text-navy-500 mt-2">Sign in to your campus account</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-navy-700">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-electric-indigo/50 focus:border-electric-indigo transition-colors"
                placeholder="you@kaleidos.demo"
                disabled
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-navy-700">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-electric-indigo/50 focus:border-electric-indigo transition-colors"
                placeholder="••••••••"
                disabled
              />
            </div>
            
            <div className="pt-4">
              <button disabled className="w-full py-3 px-4 bg-navy-100 text-navy-400 font-medium rounded-xl cursor-not-allowed">
                Sign In
              </button>
            </div>
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-navy-100"></div>
            <span className="flex-shrink-0 mx-4 text-navy-400 text-sm">Or use demo roles</span>
            <div className="flex-grow border-t border-navy-100"></div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => handleDemoLogin('student')}
              className="group w-full flex items-center justify-between p-4 rounded-xl border border-navy-100 hover:border-electric-indigo hover:shadow-md transition-all bg-white"
            >
              <div className="text-left">
                <p className="font-semibold text-navy-900 group-hover:text-electric-indigo transition-colors">Continue as Student</p>
                <p className="text-xs text-navy-500 mt-1">Shakti Mohapatra (student@kaleidos.demo)</p>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-300 group-hover:text-electric-indigo group-hover:translate-x-1 transition-all" />
            </button>

            <button 
              onClick={() => handleDemoLogin('staff')}
              className="group w-full flex items-center justify-between p-4 rounded-xl border border-navy-100 hover:border-electric-indigo hover:shadow-md transition-all bg-white"
            >
              <div className="text-left">
                <p className="font-semibold text-navy-900 group-hover:text-electric-indigo transition-colors">Continue as Staff</p>
                <p className="text-xs text-navy-500 mt-1">Dr. Ananya Sharma (faculty@kaleidos.demo)</p>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-300 group-hover:text-electric-indigo group-hover:translate-x-1 transition-all" />
            </button>

            <button 
              onClick={() => handleDemoLogin('admin')}
              className="group w-full flex items-center justify-between p-4 rounded-xl border border-navy-100 hover:border-electric-indigo hover:shadow-md transition-all bg-white"
            >
              <div className="text-left">
                <p className="font-semibold text-navy-900 group-hover:text-electric-indigo transition-colors">Continue as Administrator</p>
                <p className="text-xs text-navy-500 mt-1">Campus Operations Center</p>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-300 group-hover:text-electric-indigo group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
