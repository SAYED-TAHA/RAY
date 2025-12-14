# 🎨 Frontend Setup Guide

## ✅ الحالة الحالية

Frontend مُعد بالكامل مع:
- ✅ Next.js 14.1.0
- ✅ React 18.2.0
- ✅ TailwindCSS 3.3.0
- ✅ TypeScript 5
- ✅ API Proxy Configuration
- ✅ 148 صفحة
- ✅ 233 مكون React

## 📋 المتطلبات

- Node.js v16+
- npm أو yarn
- Backend Server يعمل على `http://localhost:5000`

## 🚀 خطوات التشغيل

### 1️⃣ تثبيت التبعيات

```bash
cd frontend
npm install
```

### 2️⃣ إعداد متغيرات البيئة

```bash
# ملف .env.local موجود بالفعل
# تأكد من أنه يحتوي على:
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3️⃣ تشغيل الـ Frontend

**وضع التطوير:**
```bash
cd frontend
npm run dev
```

**وضع الإنتاج:**
```bash
cd frontend
npm run build
npm start
```

## ✅ اختبار الـ Frontend

### 1. فتح المتصفح
```
http://localhost:3000
```

### 2. اختبار الـ API Integration
- الذهاب إلى أي صفحة تستخدم المنتجات
- يجب أن تظهر البيانات من Backend

### 3. اختبار الـ Proxy
```bash
curl http://localhost:3000/api/products
# يجب أن تحصل على نفس البيانات من Backend
```

## 📁 هيكل المشروع

```
frontend/
├── src/
│   ├── app/                          # صفحات Next.js
│   │   ├── admin/                    # صفحات الإدمن (60 صفحة)
│   │   ├── dashboard/                # لوحة التحكم (21 صفحة)
│   │   ├── systems/                  # الأنظمة (20 صفحة)
│   │   ├── merchant/                 # التاجر (5 صفحات)
│   │   ├── profile/                  # الملف الشخصي (12 صفحة)
│   │   ├── suppliers/                # الموردين (3 صفحات)
│   │   ├── business-jobs/            # وظائف الأعمال (2 صفحة)
│   │   ├── cart/                     # السلة (2 صفحة)
│   │   ├── checkout/                 # الدفع (1 صفحة)
│   │   ├── login/                    # تسجيل الدخول (1 صفحة)
│   │   ├── signup/                   # التسجيل (1 صفحة)
│   │   ├── search/                   # البحث (1 صفحة)
│   │   └── ...                       # صفحات أخرى
│   ├── components/                   # مكونات React (233 مكون)
│   │   ├── common/                   # مكونات مشتركة (26)
│   │   ├── dashboard/                # مكونات لوحة التحكم (144)
│   │   ├── layout/                   # مكونات التخطيط (3)
│   │   ├── merchant/                 # مكونات التاجر (11)
│   │   ├── views/                    # مكونات العروض (21)
│   │   ├── listings/                 # مكونات القوائم (7)
│   │   ├── modals/                   # مكونات النوافذ المنبثقة (5)
│   │   ├── storefront/               # مكونات الواجهة (3)
│   │   ├── systems/                  # مكونات الأنظمة (3)
│   │   └── ...                       # مكونات أخرى
│   ├── context/                      # Context API (9 ملفات)
│   ├── hooks/                        # Custom Hooks (2 ملف)
│   ├── services/                     # API Services (6 ملفات)
│   ├── utils/                        # Utility Functions (2 ملف)
│   ├── types/                        # TypeScript Types
│   ├── styles/                       # CSS Files
│   └── lib/                          # Libraries
├── public/                           # Static Files
├── package.json                      # التبعيات والـ scripts
├── next.config.js                    # إعدادات Next.js
├── tailwind.config.ts                # إعدادات TailwindCSS
├── tsconfig.json                     # إعدادات TypeScript
└── README.md                         # توثيق Frontend
```

## 🔌 API Integration

### Proxy Configuration
في `next.config.js`:
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:5000/api/:path*',
    },
  ];
}
```

### استخدام الـ API
```typescript
// في أي مكون
const response = await fetch('/api/products');
const data = await response.json();
```

## 📦 التبعيات الرئيسية

| الحزمة | الإصدار | الوصف |
|--------|---------|-------|
| next | 14.1.0 | إطار العمل الرئيسي |
| react | ^18.2.0 | مكتبة React |
| react-dom | ^18.2.0 | DOM Rendering |
| tailwindcss | ^3.3.0 | CSS Framework |
| typescript | ^5 | Type Safety |
| lucide-react | ^0.554.0 | Icons |
| recharts | ^2.12.0 | Charts |
| @google/genai | ^1.30.0 | Gemini AI |
| @supabase/supabase-js | ^2.84.0 | Supabase Client |

## 🎨 Styling

### TailwindCSS
- مُعد بالكامل في `tailwind.config.ts`
- يدعم Dark Mode
- يدعم RTL (Arabic)

### Global Styles
- `globals.css` - الأنماط العامة
- `postcss.config.js` - إعدادات PostCSS

## 🔐 Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here

# Supabase (إذا كنت تستخدمه)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 🐛 استكشاف الأخطاء

### خطأ: "Cannot find module"
- تأكد من تثبيت التبعيات: `npm install`
- امسح `.next` folder: `rm -rf .next`

### خطأ: "API is not responding"
- تأكد من أن Backend يعمل على `http://localhost:5000`
- تحقق من `next.config.js` rewrites

### خطأ: "Tailwind styles not loading"
- امسح `.next` folder
- أعد تشغيل الـ dev server

## 🚢 Deployment

### Vercel (الأفضل لـ Next.js)
1. اذهب إلى https://vercel.com
2. ربط Repository
3. أضف Environment Variables
4. Deploy

### Netlify
1. اذهب إلى https://netlify.com
2. ربط Repository
3. اختر Next.js
4. Deploy

### Docker
```bash
docker build -t ray-frontend .
docker run -p 3000:3000 ray-frontend
```

## 📝 ملاحظات

- الـ Frontend يعمل على المنفذ `3000` بشكل افتراضي
- جميع الصفحات مُعدة بـ TypeScript
- جميع المكونات مُعدة بـ React Functional Components
- استخدام TailwindCSS للـ Styling

## ✨ الخطوات التالية

1. ✅ تثبيت Frontend
2. ✅ ربط Backend
3. ⏳ إضافة Authentication
4. ⏳ إضافة Payment Integration
5. ⏳ إضافة Notifications

---

**تم إعداد Frontend بنجاح! 🎉**
