import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiCpu } from 'react-icons/fi';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface AssistantProps {
  stageContext: string;
}

export default function Assistant({ stageContext }: AssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I'm your VoteQuest AI Guide. How can I help you understand the election process today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          stageContext,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', content: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: `Error: ${data.error || 'Failed to get response. Please check your API key.'}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-3 bg-[rgba(0,0,0,0.2)]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(112,0,255,0.5)]">
          <FiCpu size={20} />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg font-outfit">AI Guide</h3>
          <p className="text-xs text-cyan-300">Context: {stageContext}</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
            <p className="text-[15px] leading-relaxed opacity-90">{msg.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="chat-bubble-ai flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[rgba(0,0,0,0.3)] backdrop-blur-md border-t border-[rgba(255,255,255,0.05)]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${stageContext.toLowerCase()}...`}
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-full py-4 pl-6 pr-14 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-500"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            <FiSend size={18} className="mr-0.5 mt-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
