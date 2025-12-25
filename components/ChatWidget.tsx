import React, { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../services/gemini';
import { ChatMessage, ThemeMode } from '../types';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';

const ChatWidget: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm an AI assistant trained on this portfolio. Ask me about the research, papers, or experience!", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMatrix = theme === ThemeMode.MATRIX;

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
          className={`p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 group ${isMatrix ? 'bg-green-600 text-black' : 'bg-blue-600 text-white'}`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-medium">
            Ask AI Assistant
          </span>
        </button>
      )}

      {isOpen && (
        <div className={`w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 border ${isMatrix ? 'bg-slate-900 border-green-800' : 'bg-white border-slate-200'}`}>
          {/* Header */}
          <div className={`p-4 flex justify-between items-center border-b ${isMatrix ? 'bg-black border-green-900' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <Bot className={`w-5 h-5 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
              <h3 className={`font-semibold ${isMatrix ? 'text-green-500' : 'text-slate-800'}`}>Research Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className={`transition-colors ${isMatrix ? 'text-green-700 hover:text-green-500' : 'text-slate-400 hover:text-slate-600'}`}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isMatrix ? 'bg-black/90' : 'bg-slate-50'}`}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
                    msg.role === 'user'
                      ? isMatrix ? 'bg-green-700 text-white rounded-tr-none' : 'bg-blue-600 text-white rounded-tr-none'
                      : isMatrix ? 'bg-slate-800 text-gray-200 border border-slate-700 rounded-tl-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg rounded-tl-none shadow-sm border ${isMatrix ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <Loader2 className={`w-5 h-5 animate-spin ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-3 flex gap-2 border-t ${isMatrix ? 'bg-black border-green-900' : 'bg-white border-slate-200'}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about papers, projects..."
              className={`flex-1 rounded-full px-4 py-2 outline-none text-sm border ${isMatrix ? 'bg-slate-900 text-white border-slate-700 focus:ring-2 focus:ring-green-500 focus:border-green-500' : 'bg-slate-100 text-slate-900 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-2 rounded-full text-white disabled:opacity-50 transition-colors ${isMatrix ? 'bg-green-700 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
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
