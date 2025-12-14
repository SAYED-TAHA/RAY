
"use client";

import React from 'react';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'كيف تزيد مبيعات مطعمك بنسبة 50%؟',
    excerpt: 'استراتيجيات حديثة في التسويق الرقمي للمطاعم وإدارة علاقات العملاء باستخدام أدوات راي.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
    category: 'نصائح تجارية',
    author: 'فريق راي',
    date: '20 نوفمبر 2025'
  },
  {
    id: 2,
    title: 'دليلك الشامل لفتح متجر إلكتروني ناجح',
    excerpt: 'كل ما تحتاج معرفته من اختيار المنتجات وحتى توصيل الطلب للعميل.',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800',
    category: 'تجارة إلكترونية',
    author: 'أحمد محمد',
    date: '18 نوفمبر 2025'
  },
  {
    id: 3,
    title: 'أهمية التحول الرقمي للعيادات الطبية',
    excerpt: 'كيف تساعد الأنظمة السحابية في تنظيم مواعيد المرضى وتقليل وقت الانتظار.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    category: 'تكنولوجيا الصحة',
    author: 'د. سارة علي',
    date: '15 نوفمبر 2025'
  }
];

const BlogPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-16">
         <h1 className="text-4xl font-black text-ray-black dark:text-white mb-4">مدونة راي</h1>
         <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
           مقالات، أخبار، ونصائح تساعدك على تنمية أعمالك وتحقيق أقصى استفادة من التكنولوجيا.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {posts.map((post) => (
           <article key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="h-48 overflow-hidden relative">
                 <img 
                   src={post.image} 
                   alt={post.title} 
                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                 />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-ray-blue flex items-center gap-1 shadow-sm">
                    <Tag className="w-3 h-3" />
                    {post.category}
                 </div>
              </div>
              <div className="p-6">
                 <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                 </div>
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-ray-blue dark:group-hover:text-ray-gold transition">
                    {post.title}
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                 </p>
                 <button className="text-ray-blue dark:text-ray-gold font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    اقرأ المزيد
                    <ArrowLeft className="w-4 h-4" />
                 </button>
              </div>
           </article>
         ))}
      </div>
    </div>
  );
}

export default BlogPage;
