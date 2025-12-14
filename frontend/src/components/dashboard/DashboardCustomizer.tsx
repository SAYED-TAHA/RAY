
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Layout, Check, Eye, EyeOff, GripVertical, Save } from 'lucide-react';

interface Item {
  id: string;
  label: string;
  category: 'stats' | 'actions';
}

interface DashboardCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  visibleIds: string[];
  onToggle?: (id: string) => void; // Legacy support
  onSave?: (orderedIds: string[]) => void; // New reordering support
}

const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  visibleIds, 
  onToggle,
  onSave
}) => {
  // Merge visible IDs with remaining items to create a local ordered list
  const [localItems, setLocalItems] = useState<Item[]>([]);
  const [localVisible, setLocalVisible] = useState<string[]>([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 1. Items that are currently visible, in their specific order
      const visibleItems = visibleIds
        .map(id => items.find(i => i.id === id))
        .filter((i): i is Item => !!i);
      
      // 2. Items that are hidden (append them to the end)
      const hiddenItems = items.filter(i => !visibleIds.includes(i.id));
      
      setLocalItems([...visibleItems, ...hiddenItems]);
      setLocalVisible(visibleIds);
    }
  }, [isOpen, items, visibleIds]);

  const handleToggleLocal = (id: string) => {
    if (onToggle && !onSave) {
      // Legacy mode: direct toggle
      onToggle(id);
    } else {
      // Local mode: update local state
      setLocalVisible(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent drag image
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newItems = [...localItems];
    const draggedItem = newItems[draggedItemIndex];
    newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setLocalItems(newItems);
    setDraggedItemIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const handleSaveClick = () => {
    if (onSave) {
      // Filter localItems to only include those that are visible (checked)
      // The order in localItems is preserved
      const orderedVisibleIds = localItems
        .filter(item => localVisible.includes(item.id))
        .map(item => item.id);
      
      onSave(orderedVisibleIds);
    }
    onClose();
  };

  if (!isOpen) return null;

  const stats = localItems.filter(i => i.category === 'stats');
  const actions = localItems.filter(i => i.category === 'actions');

  // Helper to render the draggable list
  const renderDraggableList = (listItems: Item[]) => (
    <div className="space-y-2">
      {listItems.map((item) => {
        const index = localItems.findIndex(i => i.id === item.id);
        const isChecked = onSave ? localVisible.includes(item.id) : visibleIds.includes(item.id);
        
        return (
          <div
            key={item.id}
            draggable={!!onSave} // Only draggable if we support saving order
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all group select-none
              ${isChecked ? 'bg-white border-ray-blue/30 shadow-sm' : 'bg-gray-50 border-transparent opacity-60'}
              ${draggedItemIndex === index ? 'opacity-50 ring-2 ring-ray-blue ring-offset-2 scale-[0.98]' : ''}
              ${onSave ? 'cursor-move' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center gap-3 flex-1" onClick={() => !onSave && handleToggleLocal(item.id)}>
              {onSave && (
                <div className="text-gray-300 cursor-grab active:cursor-grabbing hover:text-ray-blue transition-colors">
                  <GripVertical className="w-5 h-5" />
                </div>
              )}
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <div 
                  onClick={(e) => { 
                     // Prevent triggering drag when clicking checkbox area if separate
                     if(onSave) { e.stopPropagation(); handleToggleLocal(item.id); }
                  }}
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0
                    ${isChecked ? 'bg-ray-blue border-ray-blue text-white' : 'bg-white border-gray-300 text-transparent'}
                  `}
                >
                  <Check className="w-3 h-3" />
                </div>
                <span className={`text-sm font-bold ${isChecked ? 'text-gray-800' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </label>
            </div>
            
            <div className="text-gray-400 pl-2" onClick={() => onSave && handleToggleLocal(item.id)}>
              {isChecked ? <Eye className="w-4 h-4 text-ray-blue" /> : <EyeOff className="w-4 h-4" />}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-ray-blue">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">تخصيص لوحة القيادة</h3>
              <p className="text-xs text-gray-500">
                {onSave ? 'سحب وإفلات للترتيب، واختيار للعرض' : 'اختر العناصر التي تريد عرضها'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Stats Section */}
          {stats.length > 0 && (
            <section>
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                الإحصائيات
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 normal-case">{stats.length}</span>
              </h4>
              {renderDraggableList(stats)}
            </section>
          )}

          {/* Actions Section */}
          {actions.length > 0 && (
            <section>
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                الإجراءات السريعة
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 normal-case">{actions.length}</span>
              </h4>
              {renderDraggableList(actions)}
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={handleSaveClick}
            className="bg-ray-black text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {onSave ? 'حفظ الترتيب والتغييرات' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomizer;
