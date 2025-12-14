# 🔧 Backend Setup Guide

## ✅ الحالة الحالية

Backend مُعد بالكامل مع:
- ✅ Express.js Server
- ✅ MongoDB Integration
- ✅ CRUD API Endpoints
- ✅ Environment Configuration
- ✅ CORS Enabled

## 📋 المتطلبات

- Node.js v16+
- npm أو yarn
- MongoDB Atlas Account (مجاني)

## 🚀 خطوات التشغيل

### 1️⃣ تثبيت التبعيات

```bash
cd backend
npm install
```

### 2️⃣ إعداد MongoDB

#### أ) إنشاء حساب MongoDB Atlas
1. اذهب إلى https://www.mongodb.com/cloud/atlas
2. أنشئ حساب مجاني
3. أنشئ Cluster جديد (M0 Free)

#### ب) إنشاء Database User
1. في MongoDB Atlas Dashboard
2. اذهب إلى "Database Access"
3. أضف User جديد
4. احفظ Username و Password

#### ج) السماح بالوصول من أي مكان
1. اذهب إلى "Network Access"
2. أضف IP: `0.0.0.0/0` (للتطوير فقط)

#### د) الحصول على Connection String
1. اذهب إلى "Clusters"
2. اضغط "Connect"
3. اختر "Connect your application"
4. انسخ Connection String

### 3️⃣ إعداد متغيرات البيئة

```bash
cd backend/src
cp .env.example .env.local
```

ثم عدّل `.env.local`:

```env
PORT=5000
NODE_ENV=development

# استبدل بـ Connection String من MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ray_db?retryWrites=true&w=majority
MONGODB_DB_NAME=ray_db

CORS_ORIGIN=http://localhost:3000
```

### 4️⃣ تشغيل السيرفر

**وضع التطوير (مع Nodemon):**
```bash
cd backend
npm run dev
```

**وضع الإنتاج:**
```bash
cd backend
npm start
```

## ✅ اختبار الـ API

### 1. Health Check
```bash
curl http://localhost:5000
# Response: RAY API Server is running...
```

### 2. الحصول على جميع المنتجات
```bash
curl http://localhost:5000/api/products
```

### 3. إنشاء منتج جديد
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "لبن جهينة 1 لتر",
    "price": 42,
    "category": "ألبان",
    "stock": 100
  }'
```

### 4. الحصول على منتج بـ ID
```bash
curl http://localhost:5000/api/products/{id}
```

### 5. تحديث منتج
```bash
curl -X PUT http://localhost:5000/api/products/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 45,
    "stock": 80
  }'
```

### 6. حذف منتج
```bash
curl -X DELETE http://localhost:5000/api/products/{id}
```

## 📁 هيكل المشروع

```
backend/
├── src/
│   ├── index.js                           # نقطة دخول الخادم
│   ├── .env.example                       # مثال على متغيرات البيئة
│   ├── .env.local                         # متغيرات البيئة (gitignored)
│   ├── config/
│   │   └── mongodb.js                     # اتصال MongoDB
│   ├── models/
│   │   └── Product.js                     # نموذج المنتج
│   └── api/
│       ├── routes/
│       │   └── products.js                # مسارات المنتجات
│       └── controllers/
│           └── controllers/
│               └── productController.js   # منطق التحكم بالمنتجات
├── package.json                           # التبعيات والـ scripts
└── README.md                              # توثيق Backend
```

## 🔌 API Endpoints

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/products` | الحصول على جميع المنتجات |
| GET | `/api/products/:id` | الحصول على منتج واحد |
| POST | `/api/products` | إنشاء منتج جديد |
| PUT | `/api/products/:id` | تحديث منتج |
| DELETE | `/api/products/:id` | حذف منتج |

## 📦 التبعيات

| الحزمة | الإصدار | الوصف |
|--------|---------|-------|
| express | ^4.18.2 | إطار العمل الرئيسي |
| mongoose | ^8.0.0 | مكتبة MongoDB ODM |
| mongodb | ^7.0.0 | مشغل MongoDB |
| cors | ^2.8.5 | معالجة CORS |
| dotenv | ^16.3.1 | إدارة متغيرات البيئة |
| nodemon | ^3.0.1 | إعادة تشغيل تلقائي (dev) |

## 🐛 استكشاف الأخطاء

### خطأ: "Cannot find module"
- تأكد من تثبيت التبعيات: `npm install`

### خطأ: "MongoDB connection failed"
- تحقق من Connection String في `.env.local`
- تأكد من السماح بـ IP في MongoDB Atlas
- تأكد من أن Database User صحيح

### خطأ: "CORS error"
- تأكد من أن Frontend يعمل على `http://localhost:3000`
- يمكن تعديل `CORS_ORIGIN` في `.env.local`

## 🚢 Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Railway
```bash
railway link
railway up
```

### Render
1. اذهب إلى https://render.com
2. أنشئ Web Service جديد
3. ربط Repository
4. أضف Environment Variables
5. Deploy

## 📝 ملاحظات

- السيرفر يعمل على المنفذ `5000` بشكل افتراضي
- يمكن تغيير المنفذ عبر متغير البيئة `PORT`
- جميع الطلبات تحتاج إلى `Content-Type: application/json`
- جميع الـ IDs هي MongoDB ObjectIds

## ✨ الخطوات التالية

1. ✅ تثبيت Backend
2. ⏳ ربط Frontend مع Backend
3. ⏳ إضافة Authentication
4. ⏳ إضافة Validation
5. ⏳ إضافة Error Handling

---

**تم إعداد Backend بنجاح! 🎉**
