
import React, { useState } from 'react';
import { 
  Move, Plus, Save, Trash2, ZoomIn, ZoomOut, 
  Square, Circle, Armchair, Grid, Users 
} from 'lucide-react';

interface Table {
  id: string;
  type: 'square' | 'round' | 'rect';
  name: string;
  seats: number;
  x: number;
  y: number;
}

const TableLayoutEditor: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([
    { id: '1', type: 'square', name: 'T1', seats: 2, x: 50, y: 50 },
    { id: '2', type: 'round', name: 'T2', seats: 4, x: 150, y: 50 },
    { id: '3', type: 'rect', name: 'T3', seats: 6, x: 50, y: 150 },
  ]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const addTable = (type: 'square' | 'round' | 'rect') => {
    const newTable: Table = {
      id: Date.now().toString(),
      type,
      name: `T${tables.length + 1}`,
      seats: type === 'rect' ? 6 : type === 'round' ? 4 : 2,
      x: 100,
      y: 100
    };
    setTables([...tables, newTable]);
    setSelectedTable(newTable.id);
  };

  const updateTable = (id: string, field: keyof Table, value: any) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const removeTable = () => {
    if (selectedTable) {
      setTables(prev => prev.filter(t => t.id !== selectedTable));
      setSelectedTable(null);
    }
  };

  // Mock movement (simple implementation)
  const moveTable = (id: string, dx: number, dy: number) => {
    updateTable(id, 'x', Math.max(0, tables.find(t => t.id === id)!.x + dx));
    updateTable(id, 'y', Math.max(0, tables.find(t => t.id === id)!.y + dy));
  };

  return (
    <div className="flex flex-col h-full space-y-4 animate-in fade-in">
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">محرر تصميم الصالة</h2>
          <p className="text-sm text-gray-500">اسحب وأفلت الطاولات لتصميم مطعمك</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200" onClick={() => setZoom(Math.min(2, zoom + 0.1))}><ZoomIn className="w-5 h-5" /></button>
          <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}><ZoomOut className="w-5 h-5" /></button>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-orange-700 flex items-center gap-2">
            <Save className="w-4 h-4" /> حفظ التصميم
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
        {/* Sidebar Tools */}
        <div className="w-full lg:w-64 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4">
          <h3 className="font-bold text-gray-700">إضافة عناصر</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => addTable('square')} className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition">
              <Square className="w-8 h-8 text-gray-600" />
              <span className="text-xs font-bold">مربعة (2)</span>
            </button>
            <button onClick={() => addTable('round')} className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition">
              <Circle className="w-8 h-8 text-gray-600" />
              <span className="text-xs font-bold">دائرية (4)</span>
            </button>
            <button onClick={() => addTable('rect')} className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition col-span-2">
              <div className="w-12 h-8 border-2 border-gray-600 rounded"></div>
              <span className="text-xs font-bold">مستطيلة (6+)</span>
            </button>
          </div>

          {selectedTable && (
            <div className="mt-auto border-t border-gray-100 pt-4 space-y-4 animate-in slide-in-from-bottom-4">
              <h3 className="font-bold text-gray-700">خصائص الطاولة</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">رقم الطاولة</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-bold text-center outline-none focus:border-orange-500"
                  value={tables.find(t => t.id === selectedTable)?.name}
                  onChange={e => updateTable(selectedTable, 'name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">عدد المقاعد</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-bold text-center outline-none focus:border-orange-500"
                  value={tables.find(t => t.id === selectedTable)?.seats}
                  onChange={e => updateTable(selectedTable, 'seats', Number(e.target.value))}
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                 <button onClick={() => moveTable(selectedTable, 0, -10)} className="bg-gray-100 p-2 rounded text-gray-600 hover:bg-gray-200">↑</button>
                 <button onClick={() => moveTable(selectedTable, 0, 10)} className="bg-gray-100 p-2 rounded text-gray-600 hover:bg-gray-200">↓</button>
                 <button onClick={() => moveTable(selectedTable, -10, 0)} className="bg-gray-100 p-2 rounded text-gray-600 hover:bg-gray-200">→</button>
                 <button onClick={() => moveTable(selectedTable, 10, 0)} className="bg-gray-100 p-2 rounded text-gray-600 hover:bg-gray-200">←</button>
              </div>

              <button onClick={removeTable} className="w-full py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> حذف
              </button>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner overflow-hidden relative" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div 
            className="w-full h-full relative transition-transform origin-top-left"
            style={{ transform: `scale(${zoom})` }}
          >
            {tables.map((table) => (
              <div
                key={table.id}
                onClick={() => setSelectedTable(table.id)}
                className={`absolute cursor-move transition-all group flex items-center justify-center
                  ${selectedTable === table.id ? 'ring-2 ring-orange-500 z-10 shadow-lg' : 'hover:ring-2 hover:ring-orange-300'}
                  ${table.type === 'round' ? 'rounded-full' : 'rounded-lg'}
                  bg-white border-2 border-gray-300
                `}
                style={{
                  left: table.x,
                  top: table.y,
                  width: table.type === 'rect' ? 120 : 80,
                  height: 80
                }}
              >
                <div className="text-center">
                  <span className="font-bold text-gray-800 block">{table.name}</span>
                  <span className="text-[10px] text-gray-500 flex items-center justify-center gap-0.5">
                    <Users className="w-3 h-3" /> {table.seats}
                  </span>
                </div>
                
                {/* Chairs Simulation */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-2 bg-gray-400 rounded-full opacity-50"></div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-2 bg-gray-400 rounded-full opacity-50"></div>
                {table.type === 'rect' && (
                   <>
                     <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-2 h-8 bg-gray-400 rounded-full opacity-50"></div>
                     <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-2 h-8 bg-gray-400 rounded-full opacity-50"></div>
                   </>
                )}
              </div>
            ))}
          </div>
          
          {tables.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
               <div className="text-center">
                  <Grid className="w-16 h-16 mx-auto mb-2 opacity-20" />
                  <p>مساحة العمل فارغة</p>
                  <p className="text-sm">ابدأ بإضافة طاولات من القائمة الجانبية</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableLayoutEditor;
