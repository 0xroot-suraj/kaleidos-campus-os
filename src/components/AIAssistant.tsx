import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Hi! I am Ask KALÉIDOS. How can I help you navigate the campus today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Mock AI responses based on intent
    setTimeout(() => {
      let aiResponse = "I'm not sure about that. Try asking about events, timetable, or LostLoop.";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('class') || lower.includes('timetable')) {
        aiResponse = "Your next class is Data Structures at 2:00 PM in Campus 6, Room 402.";
      } else if (lower.includes('event')) {
        aiResponse = "You have 3 upcoming registrations this week, including the AI Workshop tomorrow at 2:00 PM.";
      } else if (lower.includes('lost') || lower.includes('airpods')) {
        aiResponse = "I found 2 recent LostLoop posts that may match your item. You can view them in the LostLoop section.";
      } else if (lower.includes('exam')) {
        aiResponse = "Your next exam is Mathematics on October 8.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-navy-100 z-50 overflow-hidden flex flex-col h-[500px]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-electric-indigo to-navy-900 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <span className="font-bold">Ask KALÉIDOS</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'ai' ? 'bg-electric-indigo text-white' : 'bg-navy-200 text-navy-700'
                }`}>
                  {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                  msg.role === 'ai' ? 'bg-white border border-navy-100 text-navy-900' : 'bg-electric-indigo text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-navy-100">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="flex-1 bg-navy-50 border-none rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-electric-indigo/20"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 bg-electric-indigo text-white rounded-xl disabled:opacity-50 hover:bg-indigo-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
