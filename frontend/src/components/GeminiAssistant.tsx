import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '@/services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface Props {
  context: 'merchant' | 'customer';
}

const GeminiAssistant: React.FC<Props> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: context === 'merchant' ? 'أهلاً بيك يا ريس! محتاج مساعدة في إدارة محلك النهاردة؟' : 'منور يا غالي! بتدور على حاجة معينة النهاردة؟', sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getGeminiResponse(input);
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-ray-blue to-blue-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-ray-gold" />
              <h3 className="font-bold text-lg">مساعد راي الذكي</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-ray-blue text-white self-start rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 self-end rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="self-end bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-ray-blue" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="p-2 bg-ray-gold text-ray-blue rounded-full hover:bg-yellow-400 transition disabled:opacity-50"
            >
              <Send className="w-5 h-5 rtl:rotate-180" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ray-blue/50"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-200 bg-gradient-to-r from-ray-blue to-blue-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center group`}
      >
        <Sparkles className="w-7 h-7 text-ray-gold animate-pulse" />
        <span className="sr-only">Chat with AI</span>
      </button>
    </div>
  );
};

export default GeminiAssistant;
