
import React, { useState } from 'react';
import { 
  User, Phone, DollarSign, Calendar, MoreHorizontal, 
  ArrowRight, ArrowLeft, Plus, Search
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  interest: string;
  budget: string;
  source: string;
  date: string;
  stage: 'new' | 'contacted' | 'viewing' | 'negotiation' | 'closed';
}

const initialLeads: Lead[] = [
  { id: 'L1', name: 'د. محمد علي', interest: 'فيلا - التجمع', budget: '12M', source: 'Facebook', date: 'اليوم', stage: 'new' },
  { id: 'L2', name: 'م. سارة', interest: 'شقة - العاصمة', budget: '3.5M', source: 'Website', date: 'أمس', stage: 'contacted' },
  { id: 'L3', name: 'أستاذ محمود', interest: 'مقر إداري', budget: '50k/شهر', source: 'Referral', date: '20 Nov', stage: 'viewing' },
  { id: 'L4', name: 'شركة الفتح', interest: 'مبنى كامل', budget: '45M', source: 'LinkedIn', date: '18 Nov', stage: 'negotiation' },
  { id: 'L5', name: 'كابتن شريف', interest: 'شاليه', budget: '4.2M', source: 'Ads', date: '15 Nov', stage: 'closed' },
];

const stages = [
  { id: 'new', label: 'جديد', color: 'border-blue-500 bg-blue-50' },
  { id: 'contacted', label: 'تم التواصل', color: 'border-purple-500 bg-purple-50' },
  { id: 'viewing', label: 'معاينة', color: 'border-orange-500 bg-orange-50' },
  { id: 'negotiation', label: 'تفاوض', color: 'border-yellow-500 bg-yellow-50' },
  { id: 'closed', label: 'تم الإغلاق', color: 'border-green-500 bg-green-50' },
];

const LeadsKanban: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const moveLead = (id: string, direction: 'next' | 'prev') => {
    const stageOrder: Lead['stage'][] = ['new', 'contacted', 'viewing', 'negotiation', 'closed'];
    setLeads(prev => prev.map(lead => {
      if (lead.id !== id) return lead;
      const currentIndex = stageOrder.indexOf(lead.stage);
      const nextIndex = direction === 'next' 
        ? Math.min(stageOrder.length - 1, currentIndex + 1) 
        : Math.max(0, currentIndex - 1);
      return { ...lead, stage: stageOrder[nextIndex] };
    }));
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6 text-green-600" />
            إدارة العملاء (Pipeline)
          </h2>
          <p className="text-sm text-gray-500">متابعة مسار تحويل العملاء المحتملين</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="بحث عن عميل..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-green-500" />
           </div>
           <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-green-700 transition whitespace-nowrap">
              <Plus className="w-4 h-4" />
              عميل جديد
           </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1200px] h-full">
          {stages.map(stage => (
            <div key={stage.id} className="flex-1 flex flex-col bg-gray-100/50 rounded-2xl border border-gray-200 min-h-[500px]">
              {/* Column Header */}
              <div className={`p-3 border-t-4 rounded-t-2xl bg-white border-b border-gray-100 flex justify-between items-center ${stage.color.split(' ')[0]}`}>
                <h3 className="font-bold text-gray-700">{stage.label}</h3>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg text-xs font-bold">
                  {leads.filter(l => l.stage === stage.id).length}
                </span>
              </div>

              {/* Cards */}
              <div className="p-2 space-y-3 flex-1 overflow-y-auto">
                {leads.filter(l => l.stage === stage.id).map(lead => (
                  <div key={lead.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition group relative">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800 text-sm">{lead.name}</h4>
                      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <User className="w-3 h-3" /> {lead.interest}
                      </p>
                      <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> الميزانية: {lead.budget}
                      </p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {lead.date} • {lead.source}
                      </p>
                    </div>

                    <div className="flex gap-2 border-t border-gray-50 pt-2">
                      <button 
                        onClick={() => moveLead(lead.id, 'prev')}
                        disabled={lead.stage === 'new'}
                        className="p-1.5 rounded bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button className="flex-1 py-1.5 bg-gray-50 text-gray-600 rounded text-xs font-bold hover:bg-gray-100 flex items-center justify-center gap-1">
                        <Phone className="w-3 h-3" /> اتصال
                      </button>
                      <button 
                        onClick={() => moveLead(lead.id, 'next')}
                        disabled={lead.stage === 'closed'}
                        className="p-1.5 rounded bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadsKanban;
