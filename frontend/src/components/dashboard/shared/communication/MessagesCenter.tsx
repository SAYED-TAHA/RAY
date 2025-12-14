
import React, { useState } from 'react';
import { 
  Search, Send, Paperclip, MoreVertical, Phone, Video, 
  Check, CheckCheck, User, MapPin, Clock, Image 
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'me';
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
  phone: string;
}

const initialChats: Chat[] = [
  { id: 1, name: 'أحمد محمد', lastMessage: 'هل المنتج متوفر حالياً؟', time: '10:30 ص', unread: 2, online: true, avatar: 'A', phone: '010xxxxxxx' },
  { id: 2, name: 'سارة علي', lastMessage: 'شكراً جزيلاً على الخدمة الممتازة', time: 'أمس', unread: 0, online: false, avatar: 'S', phone: '012xxxxxxx' },
  { id: 3, name: 'شركة النور', lastMessage: 'تم تحويل المبلغ', time: '20/11', unread: 0, online: false, avatar: 'N', phone: '022xxxxxxx' },
  { id: 4, name: 'كريم حسن', lastMessage: 'أريد تغيير عنوان التوصيل', time: '19/11', unread: 5, online: true, avatar: 'K', phone: '011xxxxxxx' },
];

const chatHistory: Record<number, Message[]> = {
  1: [
    { id: 1, sender: 'me', text: 'أهلاً بك يا أحمد، كيف يمكنني مساعدتك؟', time: '10:00 ص', status: 'read' },
    { id: 2, sender: 'user', text: 'كنت بسأل عن ساعة Apple Watch Series 9', time: '10:05 ص', status: 'read' },
    { id: 3, sender: 'user', text: 'هل المنتج متوفر حالياً باللون الأسود؟', time: '10:30 ص', status: 'delivered' },
  ]
};

const MessagesCenter: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(chatHistory);

  const activeChat = chats.find(c => c.id === selectedChat);
  const activeMessages = selectedChat ? (messages[selectedChat] || []) : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));
    setMessageInput('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
      {/* Chat List Sidebar */}
      <div className={`${selectedChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-80 flex-col border-l border-gray-100 bg-gray-50/30`}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">الرسائل</h2>
          <div className="relative">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="بحث في المحادثات..." 
              className="w-full bg-white border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 flex gap-3 cursor-pointer transition hover:bg-gray-50 border-b border-gray-50
                ${selectedChat === chat.id ? 'bg-blue-50/50 border-r-4 border-r-blue-500' : 'border-r-4 border-r-transparent'}
              `}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 border-2 border-white shadow-sm">
                  {chat.avatar}
                </div>
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-bold text-sm truncate ${chat.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>{chat.name}</h4>
                  <span className={`text-[10px] ${chat.unread > 0 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-xs truncate max-w-[140px] ${chat.unread > 0 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!selectedChat ? 'hidden lg:flex' : 'flex'} flex-1 flex-col bg-white relative`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedChat(null)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                  {activeChat.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{activeChat.name}</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    {activeChat.online ? 'متصل الآن' : 'آخر ظهور منذ ساعة'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-gray-500">
                <button className="p-2 hover:bg-gray-100 rounded-full transition"><Phone className="w-5 h-5" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition"><Video className="w-5 h-5" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30" style={{backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
              <div className="flex justify-center">
                <span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full">اليوم</span>
              </div>
              
              {activeMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                  <p>بداية المحادثة مع {activeChat.name}</p>
                </div>
              )}

              {activeMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm relative text-sm
                    ${msg.sender === 'me' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'}
                  `}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center gap-1 justify-end mt-1 text-[10px] ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                      <span>{msg.time}</span>
                      {msg.sender === 'me' && (
                        <span>
                          {msg.status === 'read' ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                {['📍 إرسال الموقع', '📋 قائمة المنتجات', '💳 تفاصيل الدفع'].map(chip => (
                  <button key={chip} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap transition">
                    {chip}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-200 transition">
                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition"><Paperclip className="w-5 h-5" /></button>
                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition"><Image className="w-5 h-5" /></button>
                <textarea 
                  rows={1}
                  placeholder="اكتب رسالتك هنا..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2.5 text-sm max-h-24"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) handleSendMessage(e) }}
                ></textarea>
                <button 
                  type="submit" 
                  disabled={!messageInput.trim()}
                  className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 shadow-md"
                >
                  <Send className="w-5 h-5 rtl:rotate-180" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Send className="w-8 h-8 opacity-50" />
            </div>
            <p>اختر محادثة للبدء</p>
          </div>
        )}
      </div>

      {/* Context Sidebar (Desktop) */}
      {activeChat && (
        <div className="hidden xl:block w-72 border-r border-gray-100 bg-white p-6 overflow-y-auto">
           <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-gray-600 border-4 border-white shadow-lg">
                 {activeChat.avatar}
              </div>
              <h3 className="font-bold text-lg text-gray-900">{activeChat.name}</h3>
              <p className="text-sm text-gray-500 dir-ltr">{activeChat.phone}</p>
           </div>

           <div className="space-y-6">
              <div className="space-y-3">
                 <h4 className="text-xs font-bold text-gray-400 uppercase">المعلومات</h4>
                 <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>المعادي، القاهرة</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>عميل منذ 2023</span>
                 </div>
              </div>

              <div className="space-y-3">
                 <h4 className="text-xs font-bold text-gray-400 uppercase">آخر الطلبات</h4>
                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex justify-between mb-1">
                       <span className="text-xs font-bold">#ORD-9921</span>
                       <span className="text-[10px] text-gray-400">أمس</span>
                    </div>
                    <p className="text-xs text-gray-600">2x برجر كلاسيك، 1x بيبسي</p>
                    <span className="inline-block mt-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">تم التوصيل</span>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MessagesCenter;
