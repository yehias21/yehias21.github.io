import React, { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm an AI assistant trained on this portfolio. Ask me about the research, papers, or experience!", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateAIResponse(userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black dark:bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            Ask AI Assistant
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-green-800 w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-slate-100 dark:bg-black p-4 flex justify-between items-center border-b dark:border-green-900">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600 dark:text-green-500" />
              <h3 className="font-semibold text-slate-800 dark:text-green-500">Research Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-700 dark:text-green-700 dark:hover:text-green-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-black/90">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 dark:bg-green-700 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-gray-200 border border-gray-100 dark:border-slate-700 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-100 dark:border-slate-700">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600 dark:text-green-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-black border-t dark:border-green-900 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about papers, projects..."
              className="flex-1 bg-gray-100 dark:bg-slate-900 dark:text-white border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500 outline-none text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 dark:bg-green-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
