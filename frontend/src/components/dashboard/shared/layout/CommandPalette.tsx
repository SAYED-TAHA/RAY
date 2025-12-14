
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowRight, LayoutDashboard, Settings, 
  Users, FileText, Plus, ShoppingBag 
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (view: string) => void;
}

const commands = [
  { id: 'overview', label: 'لوحة القيادة', icon: LayoutDashboard, group: 'تصفح' },
  { id: 'pos', label: 'نقطة البيع (POS)', icon: ShoppingBag, group: 'تصفح' },
  { id: 'settings', label: 'الإعدادات', icon: Settings, group: 'تصفح' },
  { id: 'customers', label: 'العملاء', icon: Users, group: 'تصفح' },
  { id: 'reports', label: 'التقارير المالية', icon: FileText, group: 'تصفح' },
  { id: 'new_order', label: 'إنشاء طلب جديد', icon: Plus, group: 'إجراءات' },
  { id: 'new_customer', label: 'إضافة عميل', icon: Users, group: 'إجراءات' },
  { id: 'new_product', label: 'إضافة منتج', icon: Plus, group: 'إجراءات' },
];

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          handleSelect(filteredCommands[activeIndex].id);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, activeIndex]);

  const handleSelect = (action: string) => {
    if (onNavigate) {
      if (action === 'new_order') onNavigate('pos');
      else if (action === 'new_customer') onNavigate('customers');
      else if (action === 'new_product') onNavigate('products');
      else onNavigate(action);
      
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[60vh]">
        <div className="flex items-center px-4 py-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 ml-3" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="ابحث عن صفحة، أمر، أو عميل... (Ctrl+K)" 
            className="flex-1 text-lg outline-none text-gray-800 placeholder-gray-400 bg-transparent"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
          />
          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded-md bg-gray-50">
            <span className="text-xs">ESC</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            <div className="space-y-1">
               {['تصفح', 'إجراءات'].map(group => {
                 const groupCommands = filteredCommands.filter(c => c.group === group);
                 if (groupCommands.length === 0) return null;
                 return (
                   <div key={group}>
                     <div className="px-3 py-2 text-xs font-bold text-gray-400">{group}</div>
                     {groupCommands.map((cmd) => {
                       const globalIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                       const isActive = globalIndex === activeIndex;
                       return (
                         <button
                           key={cmd.id}
                           onClick={() => handleSelect(cmd.id)}
                           onMouseEnter={() => setActiveIndex(globalIndex)}
                           className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-right transition-all
                             ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
                           `}
                         >
                           <div className="flex items-center gap-3">
                              <cmd.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                              <span className="font-medium">{cmd.label}</span>
                           </div>
                           {isActive && <ArrowRight className="w-4 h-4" />}
                         </button>
                       );
                     })}
                   </div>
                 );
               })}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p>لا توجد نتائج مطابقة لـ "{query}"</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 flex justify-between items-center border-t border-gray-100">
           <span>استخدم الأسهم للتنقل</span>
           <div className="flex items-center gap-2">
              <span>RAY OS</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
