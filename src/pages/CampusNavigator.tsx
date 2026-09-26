import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampusNavigator() {
  const [destination, setDestination] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigation = (dest: string) => {
    setDestination(dest);
    setIsNavigating(true);
  };

  const steps = [
    'Current Location (Library)',
    'Main Gate Walkway',
    'Academic Block 2',
    destination
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Campus Navigator</h1>
        <p className="text-navy-500 mt-1">Find your way around the university.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-navy-100 min-h-[500px] flex items-center justify-center relative overflow-hidden">
          {/* Stylized mock map background */}
          <div className="absolute inset-0 bg-navy-50" style={{
            backgroundImage: 'radial-gradient(#c2cbd6 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}></div>
          
          {/* Mock Buildings */}
          <div className="absolute inset-4">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white border-2 border-navy-200 rounded-xl flex items-center justify-center text-navy-400 font-bold">Library</div>
            <div className="absolute top-1/4 right-20 w-48 h-40 bg-white border-2 border-navy-200 rounded-xl flex items-center justify-center text-navy-400 font-bold">Campus 6</div>
            <div className="absolute bottom-20 left-1/4 w-40 h-24 bg-white border-2 border-navy-200 rounded-xl flex items-center justify-center text-navy-400 font-bold">Cafeteria</div>
            
            {/* Animated route if navigating */}
            {isNavigating && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                <motion.path 
                  d="M 120 120 Q 250 150 350 250 T 600 150"
                  fill="transparent"
                  stroke="#6610f2"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <circle cx="120" cy="120" r="6" fill="#17a2b8" />
                <motion.circle 
                  cx="600" cy="150" r="8" fill="#dc3545" 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }}
                />
              </svg>
            )}
          </div>
        </div>

        <div className="col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-navy-100 flex flex-col">
          <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-electric-indigo" />
            Directions
          </h2>
          
          <div className="mb-6">
            <label className="text-sm font-semibold text-navy-700 block mb-2">Where to?</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. Campus 6, Room 402"
                className="flex-1 border border-navy-200 rounded-lg px-4 py-2 focus:outline-none focus:border-electric-indigo"
                value={destination}
                onChange={e => setDestination(e.target.value)}
              />
              <button 
                onClick={() => startNavigation(destination || 'Campus 6')}
                className="bg-navy-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-navy-800 transition-colors"
              >
                Go
              </button>
            </div>
          </div>

          {isNavigating && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
              <div className="bg-electric-indigo/10 border border-electric-indigo/20 rounded-xl p-4 mb-6">
                <p className="text-electric-indigo font-bold text-lg mb-1">6 min</p>
                <p className="text-navy-600 text-sm">Estimated walk (450m)</p>
              </div>

              <div className="space-y-0 relative pl-4 border-l-2 border-navy-100 flex-1">
                {steps.map((step, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2 + i * 0.3 }}
                    key={i} 
                    className="mb-6 last:mb-0 relative"
                  >
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-white border-2 border-electric-indigo"></div>
                    <p className={`text-sm ${i === steps.length - 1 ? 'font-bold text-navy-900' : 'text-navy-600'}`}>{step}</p>
                  </motion.div>
                ))}
              </div>
              
              <button onClick={() => setIsNavigating(false)} className="mt-4 w-full py-2 bg-navy-50 text-navy-600 font-bold rounded-lg hover:bg-navy-100 transition-colors">
                End Navigation
              </button>
            </motion.div>
          )}

          {!isNavigating && (
            <div className="flex-1 flex flex-col justify-center items-center text-navy-400 py-10 text-center">
              <MapPin className="w-12 h-12 mb-3 opacity-20" />
              <p>Select a destination to see directions and estimated walk time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
