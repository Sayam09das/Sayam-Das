"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIChatButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! Ask me anything about Sayam Das – skills, projects, experience, or availability! 😊' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    scrollToBottom();

    try {
      // Mock AI responses about Sayam Das (replace with real API)
      const responses = {
        'skills': 'Sayam specializes in Next.js, React, TypeScript, Node.js, Python ML, and full-stack development. 4+ years experience with 85%+ proficiency in core web tech!',
        'projects': 'Key projects: AI-powered SaaS apps, Web3 systems, scalable Next.js portfolios. Check the Projects section or GitHub for live demos and code!',
        'experience': '4+ years as Full Stack Developer. Expertise in modern web (React/Next), AI/ML, cloud deployment. Currently open to exciting opportunities!',
        'availability': '📩 Open to work! Full-time roles, freelance projects, or collaborations in AI/web development. Reach out via contact form!',
        'contact': 'Use the Contact section or email sayam@example.com. Available for calls/meetings within 24hrs!',
        'default': 'Great question! Sayam is a passionate full-stack dev building AI-powered apps. Try asking about skills, projects, or availability. What else?'
      };

      // Simple keyword matching (expand for advanced AI)
      let response = responses.default;
      const lower = userMessage.toLowerCase();
      if (lower.includes('skill') || lower.includes('tech')) response = responses.skills;
      if (lower.includes('project') || lower.includes('work')) response = responses.projects;
      if (lower.includes('experience') || lower.includes('year')) response = responses.experience;
      if (lower.includes('job') || lower.includes('hire')) response = responses.availability;
      if (lower.includes('contact') || lower.includes('email')) response = responses.contact;

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsLoading(false);
        scrollToBottom();
      }, 800 + Math.random() * 1200);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Try again!' }]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
      className={cn("ai-chat-trigger fixed bottom-6 right-6 z-[1001] w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 group cursor-pointer", className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Chat"
      >
        <Bot className="w-6 h-6 group-hover:animate-bounce" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="fixed bottom-24 right-6 z-[1000] w-80 max-h-[500px] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-black/90 border border-white/20 dark:border-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/20 dark:border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Sayam AI</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ask about me!</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 p-4 max-h-[350px] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div className={cn(
                    'max-w-[80%] p-3 rounded-2xl text-sm',
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  )}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20 dark:border-white/10">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about Sayam..."
                  rows={1}
                  className="flex-1 max-h-20 resize-none bg-transparent border-none outline-none text-sm placeholder-gray-500 dark:placeholder-gray-400 p-2"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

