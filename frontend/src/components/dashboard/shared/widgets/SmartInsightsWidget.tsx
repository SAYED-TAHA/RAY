
"use client";

import React, { useState } from 'react';
import { Sparkles, RefreshCw, ChevronRight, Lightbulb, Zap } from 'lucide-react';
import { getGeminiResponse } from '@/services/geminiService';

interface SmartInsightsWidgetProps {
  dataContext: string;
}

const SmartInsightsWidget: React.FC<SmartInsightsWidgetProps> = ({ dataContext }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateInsight = async () => {
    setIsLoading(true);
    try {
      const prompt = `بناءً على هذه البيانات لنشاط تجاري: ${dataContext}
      قم بتقديم نصيحة إدارية أو تسويقية واحدة ذكية ومختصرة جداً (سطرين كحد أقصى) باللغة العربية وباللهجة المصرية المحترفة. 
      ركز على فرص النمو أو تحسين الكفاءة. لا تذكر الأرقام بالتفصيل، بل اذكر الاستنتاج.`;
      
      const response = await getGeminiResponse(prompt);
      setInsight(response);
    } catch (error) {
      console.error("Failed to generate insight", error);
      setInsight("عذراً، حدث خطأ أثناء تحليل البيانات. حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-white/10 h-full flex flex-col justify-center group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-white/10 transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                {isLoading ? (
                    <RefreshCw className="w-6 h-6 text-yellow-300 animate-spin" />
                ) : (
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                )}
            </div>
            <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                تحليل AI
            </div>
        </div>
        
        <div className="mb-6 min-h-[80px]">
          <h3 className="font-bold text-lg mb-2 text-white/90">
            رؤى ذكية
          </h3>
          
          {insight ? (
            <p className="text-indigo-100 leading-relaxed text-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
              &quot;{insight}&quot;
            </p>
          ) : (
            <p className="text-indigo-200/70 text-sm leading-relaxed">
              اضغط للتحليل الفوري لأداء عملك واكتشاف فرص النمو الكامنة باستخدام الذكاء الاصطناعي.
            </p>
          )}
        </div>

        <button 
          onClick={generateInsight}
          disabled={isLoading}
          className="w-full bg-white text-indigo-900 px-4 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
        >
          {isLoading ? 'جاري التحليل...' : insight ? 'تحديث التحليل' : 'اكتشف الآن'}
          {!isLoading && <Lightbulb className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default SmartInsightsWidget;
