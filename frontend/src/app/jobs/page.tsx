
"use client";

import React from 'react';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'القاهرة (Hybrid)',
    type: 'دوام كامل',
    salary: 'تنافسي'
  },
  {
    id: 2,
    title: 'Sales Representative',
    department: 'Sales',
    location: 'الجيزة',
    type: 'دوام كامل',
    salary: 'عمولة + راتب'
  },
  {
    id: 3,
    title: 'Customer Support Agent',
    department: 'Operations',
    location: 'عن بُعد',
    type: 'دوام جزئي',
    salary: 'قابل للتفاوض'
  }
];

const JobsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-16">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6 text-ray-blue dark:text-blue-400">
            <Briefcase className="w-8 h-8" />
         </div>
         <h1 className="text-4xl font-black text-ray-black dark:text-white mb-4">انضم لفريق راي</h1>
         <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
           نحن نبني مستقبل التجارة الرقمية في مصر. إذا كنت شغوفاً بالتكنولوجيا وتطمح لإحداث فرق حقيقي، مكانك معنا.
         </p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
         {jobs.map((job) => (
           <div key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition group cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-ray-blue dark:group-hover:text-ray-gold transition">{job.title}</h3>
                 <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                 </div>
              </div>
              <button className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold text-sm group-hover:bg-ray-blue group-hover:text-white transition w-full md:w-auto">
                 تقديم الآن
              </button>
           </div>
         ))}
      </div>
      
      <div className="mt-16 bg-blue-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 text-center">
         <h3 className="text-2xl font-bold text-ray-blue dark:text-white mb-4">لم تجد الوظيفة المناسبة؟</h3>
         <p className="text-gray-600 dark:text-gray-300 mb-8">أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرصة تناسب مهاراتك.</p>
         <button className="bg-ray-blue dark:bg-ray-gold text-white dark:text-gray-900 px-8 py-4 rounded-xl font-bold shadow-lg hover:opacity-90 transition">
            أرسل السيرة الذاتية
         </button>
      </div>
    </div>
  );
}

export default JobsPage;
