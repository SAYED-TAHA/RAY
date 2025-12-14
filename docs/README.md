# 🔧 RAY Backend API Server

Backend API مبني بـ Express.js لمنصة RAY.

## 📋 المتطلبات

- Node.js v16+
- npm أو yarn

## 🚀 البدء السريع

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. إعداد متغيرات البيئة
```bash
cp .env.example .env
```

### 3. تشغيل السيرفر

**وضع التطوير (مع Nodemon):**
```bash
npm run dev
```

**وضع الإنتاج:**
```bash
npm start
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
└── README.md                              # هذا الملف
```

## 🔌 API Endpoints

### المنتجات

#### الحصول على جميع المنتجات
```
GET /api/products
```

**Parameters:**
- `type` (optional): نوع المنتجات

**Response:**
```json
[
  {
    "id": 101,
    "name": "لبن جهينة 1 لتر",
    "price": 42,
    "barcode": "123456",
    "sku": "DAI-001",
    "category": "ألبان",
    "image": "https://...",
    "stock": 45,
    "minStock": 10,
    "status": "active",
    "dailySales": 5
  }
]
```

#### الحصول على منتج واحد
```
GET /api/products/:id
```

**Response:**
```json
{
  "id": 101,
  "name": "لبن جهينة 1 لتر",
  "price": 42,
  ...
}
```

## 🔐 CORS Configuration

السيرفر مفعّل له CORS لقبول الطلبات من:
- `http://localhost:3000` (الفرونت اند المحلي)
- أي origin آخر (قابل للتعديل في `index.js`)

## 🛠️ التطوير

### إضافة endpoint جديد

1. أنشئ route جديد في `routes/`
2. أنشئ controller في `controllers/`
3. استيراد الـ route في `index.js`

**مثال:**
```javascript
// routes/users.js
import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();
router.get('/', getUsers);
export default router;

// في index.js
import userRoutes from './routes/users.js';
app.use('/api/users', userRoutes);
```

## 📦 التبعيات

| الحزمة | الإصدار | الوصف |
|--------|---------|-------|
| express | ^4.18.2 | إطار العمل الرئيسي |
| cors | ^2.8.5 | معالجة CORS |
| dotenv | ^16.3.1 | إدارة متغيرات البيئة |
| nodemon | ^3.0.1 | إعادة تشغيل تلقائي (dev) |

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

### Vercel (Serverless)
```bash
vercel --prod
```

## 📝 ملاحظات

- السيرفر يعمل على المنفذ `5000` بشكل افتراضي
- يمكن تغيير المنفذ عبر متغير البيئة `PORT`
- البيانات الحالية هي mock data (بيانات تجريبية)
- يمكن ربط database حقيقي لاحقاً

## 🤝 المساهمة

للمساهمة في المشروع:
1. Fork المشروع
2. أنشئ branch جديد
3. اعمل على التحسينات
4. اعمل push وأرسل Pull Request

## 📄 الترخيص

MIT License

---

**تم إعداد السيرفر بنجاح! 🎉**
