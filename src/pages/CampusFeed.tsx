import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { motion } from 'framer-motion';

export default function CampusFeed() {
  const { user } = useAppContext();
  const [posts, setPosts] = useState([
    { id: 1, author: 'Student Council', role: 'Official', time: '2h ago', content: 'Don\'t forget about the Spring Festival tomorrow at the main lawn! Free food and live music. 🎸🌸', likes: 124, comments: 18 },
    { id: 2, author: 'Dr. Alan Turing', role: 'Faculty', time: '5h ago', content: 'I have uploaded the review materials for next week\'s midterm to UniVault. Please review them carefully.', likes: 45, comments: 3 }
  ]);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([{
      id: Date.now(),
      author: user?.name || 'User',
      role: user?.role || 'student',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: 0
    }, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-navy-900 tracking-tight">CampusFeed</h1>
        <p className="text-navy-500 mt-1">The heartbeat of the university.</p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-navy-100 shadow-sm flex flex-col gap-4">
        <div className="flex gap-4">
          <img src={user?.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-navy-200" />
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening on campus?"
            className="flex-1 bg-navy-50 border-none rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-electric-indigo/20 resize-none"
            rows={3}
          />
        </div>
        <div className="flex justify-between items-center ml-14">
          <button className="p-2 text-navy-400 hover:text-electric-indigo hover:bg-indigo-50 rounded-lg transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <button onClick={handlePost} className="px-6 py-2 bg-electric-indigo text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors">
            Post
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={post.id} className="bg-white rounded-2xl p-5 border border-navy-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electric-indigo text-white flex items-center justify-center font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">{post.author}</h3>
                  <p className="text-xs text-navy-500 capitalize">{post.role} • {post.time}</p>
                </div>
              </div>
            </div>
            <p className="text-navy-700 mb-4">{post.content}</p>
            <div className="flex items-center gap-6 pt-4 border-t border-navy-50 text-navy-400">
              <button className="flex items-center gap-2 hover:text-status-red transition-colors">
                <Heart className="w-5 h-5" /> <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-electric-indigo transition-colors">
                <MessageSquare className="w-5 h-5" /> <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-status-blue transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
